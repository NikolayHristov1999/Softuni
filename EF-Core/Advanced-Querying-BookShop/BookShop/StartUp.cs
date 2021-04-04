namespace BookShop
{
    using Data;
    using Initializer;
    using System.Text;
    using System;
    using System.Globalization;
    using System.Linq;
    using BookShop.Models.Enums;

    public class StartUp
    {
        public static void Main()
        {
            using var db = new BookShopContext();
            //DbInitializer.ResetDatabase(db);
            //string command = Console.ReadLine();
            //Console.WriteLine(GetBooksByAgeRestriction(db, command));
            //Console.WriteLine(GetGoldenBooks(db));
            //Console.WriteLine(GetBooksByPrice(db));
            //Console.WriteLine(GetBooksNotReleasedIn(db, int.Parse(Console.ReadLine())));
            //Console.WriteLine(GetBooksByCategory(db, Console.ReadLine()));
            //Console.WriteLine(GetBooksReleasedBefore(db,"12-04-1992"));
            //Console.WriteLine(GetAuthorNamesEndingIn(db, Console.ReadLine()));
            //Console.WriteLine(GetBookTitlesContaining(db, Console.ReadLine()));
            //Console.WriteLine(GetBooksByAuthor(db, Console.ReadLine()));
            //Console.WriteLine(CountBooksCaller(db));
            //Console.WriteLine(CountCopiesByAuthor(db));
            //Console.WriteLine(GetTotalProfitByCategory(db));
            //Console.WriteLine(GetMostRecentBooks(db));
            //IncreasePrices(db);
            Console.WriteLine(RemoveBooks(db));
        }
        public static int RemoveBooks(BookShopContext context)
        {
            var books = context.Books
                .Where(x => x.Copies < 4200)
                .ToList();

            context.Books.RemoveRange(books);
            context.SaveChanges();
            return books.Count;

        }
        public static void IncreasePrices(BookShopContext context)
        {
            var books = context.Books
                .Where(x => x.ReleaseDate.Value.Year < 2010)
                .ToList();

            foreach(var book in books)
            {
                book.Price += 5;
            }
            context.SaveChanges();
        }
        public static string GetMostRecentBooks(BookShopContext context)
        {
            var categoriesAndBooks = context.Categories
                .Select(x => new
                {
                    x.Name,
                    Books = x.CategoryBooks
                        .OrderByDescending(b => b.Book.ReleaseDate)
                        .Select(b => b.Book)
                        .Take(3)
                        .ToList()
                })
                .OrderBy(x => x.Name)
                .ToList();

            var sb = new StringBuilder();
            foreach(var category in categoriesAndBooks)
            {
                sb.AppendLine($"--{category.Name}");
                foreach(var book in category.Books)
                {
                    sb.AppendLine($"{book.Title} ({book.ReleaseDate.Value.Year})");
                }
            }
            return sb.ToString();
        }
        public static string GetTotalProfitByCategory(BookShopContext context)
        {
            var categoryIncome = context.Categories
                .Select(x => new
                {
                    x.Name,
                    Profit = x.CategoryBooks.Sum(p => p.Book.Price * p.Book.Copies)
                })
                .OrderByDescending(x => x.Profit)
                .ToList();

            var sb = new StringBuilder();
            foreach(var category in categoryIncome)
            {
                sb.AppendLine($"{category.Name} ${category.Profit:f2}");
            }
            return sb.ToString();
        }
        public static string CountCopiesByAuthor(BookShopContext context)
        {
            var authorAndTheirBookCopies = context.Authors
                .Select(x => new
                {
                    Name = x.FirstName + " " + x.LastName,
                    Copies = x.Books.Sum(p => p.Copies)
                })
                .OrderByDescending(x => x.Copies)
                .ToList();

            var sb = new StringBuilder();
            foreach(var author in authorAndTheirBookCopies)
            {
                sb.AppendLine($"{author.Name} - {author.Copies}");
            }
            return sb.ToString();
        }
        public static string CountBooksCaller(BookShopContext db)
        {
            int length = int.Parse(Console.ReadLine());
            int count = CountBooks(db, length);
            return $"There are {count} books with longer title than {length} symbols";
        }
        public static int CountBooks(BookShopContext context, int lengthCheck)
        {
            int count = context.Books
                .Where(x => x.Title.Length > lengthCheck)
                .Count();

            return count;
        }
        public static string GetBooksByAuthor(BookShopContext context, string input)
        {
            input = input.ToLower();
            var books = context.Books
                .Where(x => x.Author.LastName.ToLower().StartsWith(input))
                .OrderBy(x => x.BookId)
                .Select(x => new
                {
                    x.Author,
                    x.Title
                })
                .ToList();
            /*var authors = context.Authors
                .Where(x => x.LastName.ToLower().StartsWith(input))
                .Select(x => new
                {
                    AuthorName = x.FirstName + " " + x.LastName,
                    Books = x.Books
                })
                .ToList();*/

            var sb = new StringBuilder();
            foreach(var book in books)
            {
                sb.AppendLine($"{book.Title} ({book.Author.FirstName} {book.Author.LastName})");
            }
            return sb.ToString();
        }
        public static string GetBookTitlesContaining(BookShopContext context, string input)
        {
            input = input.ToLower();
            var books = context.Books
                .Where(x => x.Title.ToLower().Contains(input))
                .OrderBy(x => x.Title)
                .Select(x => x.Title)
                .ToList();

            return string.Join(Environment.NewLine, books);
        }
        public static string GetAuthorNamesEndingIn(BookShopContext context, string input)
        {
            var authors = context.Authors
                .Where(x => x.FirstName.EndsWith(input))
                .Select(x => new
                {
                    x.FirstName,
                    x.LastName
                })
                .OrderBy(x => x.FirstName)
                .ThenBy(x => x.LastName)
                .ToList();

            var sb = new StringBuilder();
            foreach(var author in authors)
            {
                sb.AppendLine($"{author.FirstName} {author.LastName}");
            }
            return sb.ToString();
        }
        public static string GetBooksReleasedBefore(BookShopContext context, string date)
        {
            var books = context.Books
                .Where(x => x.ReleaseDate < DateTime.Parse(date, new CultureInfo("bg-BG")))
                .OrderByDescending(x => x.ReleaseDate)
                .Select(x => new
                {
                    x.Title,
                    x.EditionType,
                    x.Price,
                    x.ReleaseDate
                })
                .ToList();
            var sb = new StringBuilder();
            foreach(var book in books)
            {
                sb.AppendLine($"{book.Title} - {book.EditionType} - ${book.Price:f2}");
            }
            return sb.ToString();
        }
        public static string GetBooksByCategory(BookShopContext context, string input)
        {
            var categories = input.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.ToLower());
            var books = context.Books
                .Where(x => x.BookCategories
                    .Any(p => categories.Contains(p.Category.Name.ToLower())))
                .OrderBy(x => x.Title)
                .Select(x => x.Title)
                .ToList();
               

            return string.Join(Environment.NewLine, books);
        }
        public static string GetBooksNotReleasedIn(BookShopContext context, int year)
        {
            var books = context.Books
                .Where(x => x.ReleaseDate.Value.Year != year)
                .OrderBy(x => x.BookId)
                .Select(x => x.Title)
                .ToList();

            return string.Join(Environment.NewLine, books);
        }
        public static string GetBooksByPrice(BookShopContext context)
        {
            var books = context.Books
                .Where(x => x.Price > 40m)
                .Select(x => new
                {
                    x.Title,
                    x.Price
                })
                .OrderByDescending(x => x.Price)
                .ToList();

            var sb = new StringBuilder();
            foreach (var book in books)
            {
                sb.AppendLine($"{book.Title} - ${book.Price:f2}");
            }
            return sb.ToString();
        }
        public static string GetGoldenBooks(BookShopContext context)
        {
            var books = context.Books
                .Where(x => x.EditionType == EditionType.Gold && x.Copies < 5000)
                .OrderBy(x => x.BookId)
                .Select(x => x.Title)
                .ToList();

            return string.Join(Environment.NewLine, books);
        }
        public static string GetBooksByAgeRestriction(BookShopContext context, string command)
        {
            var sb = new StringBuilder();
            var ageRestriction = Enum.Parse<AgeRestriction>(command, true);
            var books = context.Books
                .Where(x => x.AgeRestriction == ageRestriction)
                .OrderBy(x => x.Title)
                .Select(x => x.Title)
                .ToList();

            foreach(var book in books)
            {
                sb.AppendLine($"{book}");
            }
            return sb.ToString();
                
        }
    }
}
