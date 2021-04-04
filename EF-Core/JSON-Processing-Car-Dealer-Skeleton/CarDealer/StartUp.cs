using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using CarDealer.Data;
using CarDealer.DTO;
using CarDealer.Models;
using Newtonsoft.Json;

namespace CarDealer
{
    public class StartUp
    {
        static IMapper mapper;
        public static void Main(string[] args)
        {
            var context = new CarDealerContext();
            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated();

            //string supplierInputJson = File.ReadAllText("../../../Datasets/suppliers.json");
            //string partsInputJson = File.ReadAllText("../../../Datasets/parts.json");
            //string carsInputJson = File.ReadAllText("../../../Datasets/cars.json");
            //string customersInputJson = File.ReadAllText("../../../Datasets/customers.json");
            //string salesInputJson = File.ReadAllText("../../../Datasets/sales.json");

            //Console.WriteLine(ImportSuppliers(context, supplierInputJson));
            //Console.WriteLine(ImportParts(context, partsInputJson));
            //Console.WriteLine(ImportCars(context, carsInputJson));
            //Console.WriteLine(ImportCustomers(context, customersInputJson));
            //Console.WriteLine(ImportSales(context, salesInputJson));

            Console.WriteLine(GetSalesWithAppliedDiscount(context));
        }
        public static string GetSalesWithAppliedDiscount(CarDealerContext context)
        {
            var sales = context.Sales
                .Select(x => new
                {
                    car = new
                    {
                        Make = x.Car.Make,
                        x.Car.Model,
                        x.Car.TravelledDistance
                    },
                    customerName = x.Customer.Name,
                    Discount = x.Discount,
                    price = x.Car.PartCars.Sum(s => s.Part.Price),
                    priceWithDiscount = (x.Car.PartCars.Sum(s => s.Part.Price) - (x.Car.PartCars.Sum(s => s.Part.Price)) * (x.Discount / 100)).ToString("f2")
                })
                .Take(10)
                .ToList();

            return JsonConvert.SerializeObject(sales, Formatting.Indented);
        }
        public static string GetTotalSalesByCustomer(CarDealerContext context)
        {
            var customers = context.Customers
                .Where(x => x.Sales.Count >= 1)
                .Select(x => new
                {
                    fullName = x.Name,
                    boughtCars = x.Sales.Count,
                    spentMoney = x.Sales.Sum(p => p.Car.PartCars.Sum(s => s.Part.Price))
                })
                .OrderByDescending(x => x.spentMoney)
                .ThenByDescending(x => x.boughtCars)
                .ToList();

            return JsonConvert.SerializeObject(customers, Formatting.Indented);
        }
        public static string GetCarsWithTheirListOfParts(CarDealerContext context)
        {
            var cars = context.Cars
                .Select(x => new
                {
                    car = new
                    {
                        x.Make,
                        x.Model,
                        x.TravelledDistance
                    },
                    parts = x.PartCars.Select(s => new
                    {
                        Name = s.Part.Name,
                        Price = s.Part.Price.ToString("f2")
                    })
                });

            return JsonConvert.SerializeObject(cars, Formatting.Indented);
        }
        public static string GetLocalSuppliers(CarDealerContext context)
        {
            var suppliers = context.Suppliers
                .Where(x => x.IsImporter == false)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    PartsCount = x.Parts.Count
                })
                .ToList();

            return JsonConvert.SerializeObject(suppliers, Formatting.Indented);
        }
        public static string GetCarsFromMakeToyota(CarDealerContext context)
        {
            var cars = context.Cars
                .Where(x => x.Make.Equals("Toyota"))
                .Select(x => new
                {
                    x.Id,
                    x.Make,
                    x.Model,
                    x.TravelledDistance
                })
                .OrderBy(x => x.Model)
                .ThenByDescending(x => x.TravelledDistance)
                .ToList();

            return JsonConvert.SerializeObject(cars, Formatting.Indented);
        }
        public static string GetOrderedCustomers(CarDealerContext context)
        {
            var customers = context.Customers
                .OrderBy(x => x.BirthDate)
                .ThenBy(x => x.IsYoungDriver)
                .Select(x => new
                {
                    x.Name,
                    BirthDate = x.BirthDate.ToString("dd/MM/yyyy"),
                    x.IsYoungDriver
                });

            return JsonConvert.SerializeObject(customers, Formatting.Indented);
        }
        public static string ImportSales(CarDealerContext context, string inputJson)
        {
            InitializeMapper();
            var salesDto = JsonConvert.DeserializeObject<IEnumerable<SaleInputModel>>(inputJson);
            var sales = mapper.Map<IEnumerable<Sale>>(salesDto);

            context.Sales.AddRange(sales);
            context.SaveChanges();

            return $"Successfully imported {sales.Count()}.";
        }
        public static string ImportCustomers(CarDealerContext context, string inputJson)
        {
            InitializeMapper();
            var customersDto = JsonConvert.DeserializeObject<IEnumerable<CustomerInputModel>>(inputJson);
            var customers = mapper.Map<IEnumerable<Customer>>(customersDto);

            context.Customers.AddRange(customers);
            context.SaveChanges();

            return $"Successfully imported {customers.Count()}.";
        }
        public static string ImportCars(CarDealerContext context, string inputJson)
        {
            var carsDto = JsonConvert.DeserializeObject<IEnumerable<CarsInputModel>>(inputJson);
            var listOfCars = new List<Car>();
            foreach (var car in carsDto)
            {
                var currentCar = new Car
                {
                    Make = car.Make,
                    Model = car.Model,
                    TravelledDistance = car.TravelledDistance
                };

                foreach(var partId in car.PartsId.Distinct())
                {
                    currentCar.PartCars.Add(new PartCar
                    {
                        PartId = partId
                    });
                }
                listOfCars.Add(currentCar);
            }

            context.Cars.AddRange(listOfCars);
            context.SaveChanges();

            return $"Successfully imported {listOfCars.Count()}.";
            
        }
        public static string ImportParts(CarDealerContext context, string inputJson)
        {
            var supplierIds = context.Suppliers
                .Select(x => x.Id)
                .ToArray();
            var partsDto = JsonConvert.DeserializeObject<IEnumerable<Part>>(inputJson)
                .Where(x => supplierIds.Contains(x.SupplierId))
                .ToList();

            context.Parts.AddRange(partsDto);
            context.SaveChanges();

            return $"Successfully imported {partsDto.Count()}.";
        }
        public static string ImportSuppliers(CarDealerContext context, string inputJson)
        {
            InitializeMapper();
            var suppliersDto = JsonConvert.DeserializeObject<IEnumerable<SupplierInputModel>>(inputJson);
            var suppliers = suppliersDto.Select(x => new Supplier
            {
                Name = x.Name,
                IsImporter = x.IsImporter
            });

            context.Suppliers.AddRange(suppliers);
            context.SaveChanges();

            return $"Successfully imported {suppliers.Count()}.";

        }
        private static void InitializeMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<CarDealerProfile>();
            });

            mapper = config.CreateMapper();
        }
    }
}