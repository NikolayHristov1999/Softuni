using CarDealer.Data;
using System.IO;
using System;
using System.Xml.Serialization;
using CarDealer.DTO;
using CarDealer.Models;
using System.Linq;
using AutoMapper;
using System.Collections.Generic;
using CarDealer.DTO.Output;

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

            //var supplierXml = File.ReadAllText("./Datasets/suppliers.xml");
            //var partsXml = File.ReadAllText("./Datasets/parts.xml");
            //var carsXml = File.ReadAllText("./Datasets/cars.xml");
            //var customersXml = File.ReadAllText("./Datasets/customers.xml");
            //var salesXml = File.ReadAllText("./Datasets/sales.xml");

            //Console.WriteLine(ImportSuppliers(context, supplierXml));
            //Console.WriteLine(ImportParts(context, partsXml));
            //Console.WriteLine(ImportCars(context, carsXml));
            //Console.WriteLine(ImportCustomers(context, customersXml));
            //Console.WriteLine(ImportSales(context, salesXml));

            //Console.WriteLine(GetCarsWithDistance(context));
            //Console.WriteLine(GetCarsFromMakeBmw(context));
            Console.WriteLine(GetLocalSuppliers(context));
            Console.WriteLine(GetCarsWithTheirListOfParts(context));
            Console.WriteLine(GetTotalSalesByCustomer(context));
            Console.WriteLine(GetSalesWithAppliedDiscount(context));
        }
        public static string GetSalesWithAppliedDiscount(CarDealerContext context)
        {
            var salesList = context.Sales.Select(s => new SaleWithDiscountOutputModel
            {
                Car = new CarSaleOutputModel
                {
                    Make = s.Car.Make,
                    Model = s.Car.Model,
                    TravelledDistance = s.Car.TravelledDistance
                },
                CustomerName = s.Customer.Name,
                Discount = s.Discount,
                Price = s.Car.PartCars.Sum(pc => pc.Part.Price),
                PriceWithDiscount = s.Car.PartCars.Sum(pc => pc.Part.Price) - s.Car.PartCars.Sum(pc => pc.Part.Price) * s.Discount / 100m
            }).ToList();

            var root = new XmlRootAttribute("sales");
            var serializer = new XmlSerializer(typeof(List<SaleWithDiscountOutputModel>), root);

            var textWriter = new StringWriter();

            var namespacesSerializer = new XmlSerializerNamespaces();
            namespacesSerializer.Add("", "");

            serializer.Serialize(textWriter, salesList, namespacesSerializer);

            return textWriter.ToString();
        }

        //public static string GetSalesWithAppliedDiscount(CarDealerContext context)
        //{
        //    //Get all sales with information about the car, customer and price of the sale with and without discount.
        //    var sales = context.Sales
        //        .Select(x => new SaleWithDiscountOutputModel
        //        {
        //            Car = new CarSaleOutputModel
        //            {
        //                Make = x.Car.Make,
        //                Model = x.Car.Model,
        //                TravelledDistance = x.Car.TravelledDistance
        //            },
        //            Discount = x.Discount,
        //            CustomerName = x.Customer.Name,
        //            Price = x.Car.PartCars.Sum(s => s.Part.Price),
        //            PriceWithDiscount = (x.Car.PartCars.Sum(s => s.Part.Price) - x.Car.PartCars.Sum(s => s.Part.Price) * x.Discount / 100)
        //        })
        //        .ToArray();

        //    var xmlSerializer = new XmlSerializer(typeof(SaleWithDiscountOutputModel[]), new XmlRootAttribute("sales"));
        //    var ns = new XmlSerializerNamespaces();
        //    ns.Add("", "");

        //    var textWriter = new StringWriter();
        //    xmlSerializer.Serialize(textWriter, sales, ns);

        //    return textWriter.ToString();
        //}
        public static string GetTotalSalesByCustomer(CarDealerContext context)
        {
            //Get all customers that have bought at least 1 car and get their names, bought cars count and total spent money on cars. Order the result list by total spent money descending.
            var customers = context.Customers
                .Where(x => x.Sales.Count > 0)
                .Select(x => new CustomersOutputModel
                {
                    FullName = x.Name,
                    BoughtCars = x.Sales.Count,
                    SpentMoney = x.Sales
                        .Select(s => s.Car)
                        .SelectMany(s => s.PartCars)
                        .Sum(p => p.Part.Price)
                })
                .OrderByDescending(x => x.SpentMoney)
                .ToArray();

            var xmlSerializer = new XmlSerializer(typeof(CustomersOutputModel[]), new XmlRootAttribute("customers"));

            var textWriter = new StringWriter();
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            xmlSerializer.Serialize(textWriter, customers, ns);

            return textWriter.ToString();

        }
       
        public static string GetCarsWithTheirListOfParts(CarDealerContext context)
        {
            var cars = context.Cars
                .Select(x => new CarPartOutputModel
                {
                    Make = x.Make,
                    Model = x.Model,
                    TravelledDistance = x.TravelledDistance,
                    Parts = x.PartCars.Select(s => new CarPartsInfoOutputModel
                    {
                        Name = s.Part.Name,
                        Price = s.Part.Price
                    }).OrderByDescending(s => s.Price)
                    .ToArray()
                }).OrderByDescending(x => x.TravelledDistance)
                .ThenBy(x => x.Model)
                .Take(5)
                .ToArray();

            var xmlSerializer = new XmlSerializer(typeof(CarPartOutputModel[]), new XmlRootAttribute("cars"));

            var textWriter = new StringWriter();
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            xmlSerializer.Serialize(textWriter, cars, ns);

            return textWriter.ToString();

        }
        public static string GetLocalSuppliers(CarDealerContext context)
        {
            var suppliers = context.Suppliers
                .Where(x => !x.IsImporter)
                .Select(x => new InternalSuppliersInputModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    PartsCount = x.Parts.Count
                })
                .ToArray();

            var xmlSerializer = new XmlSerializer(typeof(InternalSuppliersInputModel[]), new XmlRootAttribute("suppliers"));

            var textWriter = new StringWriter();
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            xmlSerializer.Serialize(textWriter, suppliers, ns);

            return textWriter.ToString();

        }
        public static string GetCarsFromMakeBmw(CarDealerContext context)
        {
            var cars = context.Cars
               .Where(x => x.Make.Equals("BMW"))
               .Select(x => new CarBmwOutputModel
               {
                   Id = x.Id,
                   Model = x.Model,
                   TravelledDistance = x.TravelledDistance
               })
               .OrderBy(x => x.Model)
               .ThenByDescending(x => x.TravelledDistance)
               .ToArray();

            var xmlSerializer = new XmlSerializer(typeof(CarBmwOutputModel[]), new XmlRootAttribute("cars"));

            var textWriter = new StringWriter();
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            xmlSerializer.Serialize(textWriter, cars, ns);

            return textWriter.ToString();
        }
        public static string GetCarsWithDistance(CarDealerContext context)
        {
            var cars = context.Cars
                .Where(x => x.TravelledDistance > 2_000_000)
                .Select(x => new CarOutputModel
                {
                    Make = x.Make,
                    Model = x.Model,
                    TravelledDistance = x.TravelledDistance
                })
                .OrderBy(x => x.Make)
                .ThenBy(x => x.Model)
                .Take(10)
                .ToArray();

            var xmlSerializer = new XmlSerializer(typeof(CarOutputModel[]), new XmlRootAttribute("cars"));

            var textWriter = new StringWriter();
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            xmlSerializer.Serialize(textWriter, cars, ns);

            return textWriter.ToString();

        }
        public static string ImportSales(CarDealerContext context, string inputXml)
        {
            var xmlSerializer = new XmlSerializer(typeof(SaleInputDto[]), new XmlRootAttribute("Sales"));
            var salesDto = xmlSerializer.Deserialize(new StringReader(inputXml)) as SaleInputDto[];

            var carsId = context.Cars.Select(x => x.Id).ToList();

            var sales = salesDto
                .Where(x => carsId.Contains(x.CarId))
                .Select(x => new Sale
                {
                    CarId = x.CarId,
                    CustomerId = x.CustomerId,
                    Discount = x.Discount
                })
                .ToList();

            context.Sales.AddRange(sales);
            context.SaveChanges();

            return $"Successfully imported {sales.Count}";
        }
        
        public static string ImportCustomers(CarDealerContext context, string inputXml)
        {
            InitializeMapper();

            var xmlSerializer = new XmlSerializer(typeof(CustomersInputModel[]), new XmlRootAttribute("Customers"));
            var customersdto = xmlSerializer.Deserialize(new StringReader(inputXml)) as IEnumerable<CustomersInputModel>;

            var customers = mapper.Map<IEnumerable<Customer>>(customersdto);
            context.Customers.AddRange(customers);
            context.SaveChanges();

            return $"Successfully imported {customers.Count()}";
        }
        public static string ImportCars(CarDealerContext context, string inputXml)
        {
            //InitializeMapper();
            var xmlSerializer = new XmlSerializer(typeof(CarInputModel[]), new XmlRootAttribute("Cars"));
            var carsdto = xmlSerializer.Deserialize(new StringReader(inputXml)) as CarInputModel[];
            //xmlSerializer.Deserialize(new StringReader(inputXml)) as PartInputModel[]

            var allParts = context.Parts.Select(x => x.Id).ToList();
            var cars = carsdto.Select(x => new Car
            {
                Make = x.Make,
                Model = x.Model,
                TravelledDistance = x.TraveledDistance,
                PartCars = x.CarsPartsInputModel.Select(x => x.Id)
                        .Distinct()
                        .Intersect(allParts)
                        .Select(pc => new PartCar
                        {
                            PartId = pc
                        })
                        .ToList()
            }).ToList();

            context.Cars.AddRange(cars);
            context.SaveChanges();

            return $"Successfully imported {cars.Count}";
        }

        public static string ImportSuppliers(CarDealerContext context, string inputXml)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(SupplierInputModel[]), new XmlRootAttribute("Suppliers"));

            var supplierDto = (SupplierInputModel[])xmlSerializer.Deserialize(new StringReader(inputXml));

            var suppliers = supplierDto.Select(x => new Supplier
            {
                Name = x.Name,
                IsImporter = x.IsImporter
            })
            .ToList();

            context.Suppliers.AddRange(suppliers);
            context.SaveChanges();


            return $"Successfully imported {suppliers.Count}";
        }
        public static string ImportParts(CarDealerContext context, string inputXml)
        {
            var xmlSerializer = new XmlSerializer(typeof(PartInputModel[]), new XmlRootAttribute("Parts"));
            var partsInputModel = xmlSerializer.Deserialize(new StringReader(inputXml)) as PartInputModel[];

            var suppliersIds = context.Suppliers
                .Select(x => x.Id)
                .ToList();

            var parts = partsInputModel
                .Where(x => suppliersIds.Contains(x.SupplierId))
                .Select(x => new Part
                {
                    Name = x.Name,
                    Price = x.Price,
                    Quantity = x.Quantity,
                    SupplierId = x.SupplierId
                })
                .ToList();

            context.Parts.AddRange(parts);
            context.SaveChanges();

            return $"Successfully imported {parts.Count}";
        }
        private static void InitializeMapper()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<CarDealerProfile>());
            mapper = new Mapper(config);
        }

    }
}