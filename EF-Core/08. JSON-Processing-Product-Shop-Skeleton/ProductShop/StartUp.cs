using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProductShop.Data;
using ProductShop.DataTransferObjects;
using ProductShop.Models;

namespace ProductShop
{
    public class StartUp
    {
        static IMapper mapper;
        public static void Main(string[] args)
        {
            var context = new ProductShopContext();

            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated();

            //string inputJsonUsers = File.ReadAllText("../../../Datasets/users.json");
            //string inputJsonProducts = File.ReadAllText("../../../Datasets/products.json");
            //string inputJsonCategories = File.ReadAllText("../../../Datasets/categories.json");
            //string inputJsonCategoriesProducts = File.ReadAllText("../../../Datasets/categories-products.json");

            //Console.WriteLine(ImportUsers(context, inputJsonUsers));
            //Console.WriteLine(ImportProducts(context, inputJsonProducts));
            //Console.WriteLine(ImportCategories(context, inputJsonCategories));
            //Console.WriteLine(ImportCategoryProducts(context, inputJsonCategoriesProducts));

            //Console.WriteLine(GetProductsInRange(context));
            //Console.WriteLine(GetSoldProducts(context));
            //Console.WriteLine(GetCategoriesByProductsCount(context));
            Console.WriteLine(GetUsersWithProducts(context));
        }
        public static string GetUsersWithProducts(ProductShopContext context)
        {
           
            var users = context.Users
                .Include(x => x.ProductsSold)
                .ToList()
                .Where(x => x.ProductsSold.Any(p => p.BuyerId != null))
                .Select(x => new
                {
                    firstName = x.FirstName,
                    lastName = x.LastName,
                    age = x.Age,
                    soldProducts = new
                    {
                        count = x.ProductsSold.Where(p => p.BuyerId != null).Count(),
                        products = x.ProductsSold
                            .Where(p => p.BuyerId != null)
                            .Select(p => new
                            {
                                name = p.Name,
                                price = p.Price
                            })
                    }
                })
                .OrderByDescending(x => x.soldProducts.products.Count())
                .ToList();

            var result = new
            {
                usersCount = users.Count(),
                users
            };
            var jsonSettings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };
            return JsonConvert.SerializeObject(result,Formatting.Indented, jsonSettings);
        }
        public static string GetCategoriesByProductsCount(ProductShopContext context)
        {
            var categories = context.Categories
                .Select(x => new
                {
                    category = x.Name,
                    productsCount = x.CategoryProducts.Count,
                    averagePrice = x.CategoryProducts.Average(avg => avg.Product.Price).ToString("F2"),
                    totalRevenue = x.CategoryProducts.Sum(s => s.Product.Price).ToString("F2")
                })
                .OrderByDescending(x => x.productsCount)
                .ToList();

            return JsonConvert.SerializeObject(categories, Formatting.Indented);
        }
        
        public static string GetSoldProducts(ProductShopContext context)
        {
            var users = context.Users
                .Where(x => x.ProductsSold.Count(p => p.Buyer != null) >= 1)
                .Select(x => new
                {
                    firstName = x.FirstName,
                    lastName = x.LastName,
                    soldProducts = x.ProductsSold.Select(p => new
                    {
                        name = p.Name,
                        price = p.Price,
                        buyerFirstName = p.Buyer.FirstName,
                        buyerLastName = p.Buyer.LastName
                    })
                })
                .OrderBy(x => x.lastName)
                .ThenBy(x => x.firstName)
                .ToList();

            var result = JsonConvert.SerializeObject(users, Formatting.Indented);
            return result;
        }
        public static string GetProductsInRange(ProductShopContext context)
        {
            var productsInRange = context.Products
                .Where(x => x.Price >= 500 && x.Price <= 1000)
                .OrderBy(x => x.Price)
                .Select(x => new
                {
                    name = x.Name,
                    price = x.Price,
                    seller = x.Seller.FirstName + " " + x.Seller.LastName
                })
                .ToList();
            return JsonConvert.SerializeObject(productsInRange, Formatting.Indented);

        }
        public static string ImportCategoryProducts(ProductShopContext context, string inputJson)
        {
            InitializaAutoMapper();
            var categoriesProductsDto = JsonConvert.DeserializeObject<IEnumerable<CategoryProductInputModel>>(inputJson);
            var categoriesProducts = mapper.Map<IEnumerable<CategoryProduct>>(categoriesProductsDto);

            context.CategoryProducts.AddRange(categoriesProducts);
            context.SaveChanges();

            return $"Successfully imported {categoriesProducts.Count()}";
        }
        public static string ImportProducts(ProductShopContext context, string inputJson)
        {
            InitializaAutoMapper();
            var prodcutsDto = JsonConvert.DeserializeObject<IEnumerable<ProductsInputModel>>(inputJson);
            var products = mapper.Map<IEnumerable<Product>>(prodcutsDto);

            context.Products.AddRange(products);
            context.SaveChanges();
            return $"Successfully imported {products.Count()}";
        }
        public static string ImportUsers(ProductShopContext context, string inputJson)
        {
            InitializaAutoMapper();
            var usersdto = JsonConvert.DeserializeObject<IEnumerable<UsersInputModel>>(inputJson);
            var users = mapper.Map<IEnumerable<User>>(usersdto);

            context.Users.AddRange(users);
            context.SaveChanges();

            return $"Successfully imported {users.Count()}";
        }
        public static string ImportCategories(ProductShopContext context, string inputJson)
        {
            InitializaAutoMapper();
            var categoriesdto = JsonConvert.DeserializeObject<IEnumerable<CategoriesInputModel>>(inputJson)
                .Where(x => x.Name != null)
                .ToList();
            var categories = mapper.Map<IEnumerable<Category>>(categoriesdto);

            context.Categories.AddRange(categories);
            context.SaveChanges();

            return $"Successfully imported {categories.Count()}";
        }

        private static void InitializaAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<ProductShopProfile>();
            });

            mapper = config.CreateMapper();

        }
    }
}