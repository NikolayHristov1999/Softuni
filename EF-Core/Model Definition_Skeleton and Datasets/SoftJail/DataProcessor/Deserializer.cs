namespace SoftJail.DataProcessor
{

    using Data;
    using Newtonsoft.Json;
    using SoftJail.Data.Models;
    using SoftJail.Data.Models.Enums;
    using SoftJail.DataProcessor.ImportDto;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;

    public class Deserializer
    {
        public static string ImportDepartmentsCells(SoftJailDbContext context, string jsonString)
        {
            var departments = new List<Department>();

            var departmentsCells = JsonConvert.DeserializeObject<IEnumerable<DepartmentCellInputModel>>(jsonString);
            var sb = new StringBuilder();
            

            foreach (var departmentCell in departmentsCells)
            {
                if (!IsValid(departmentCell) || 
                    !departmentCell.Cells.All(IsValid) || 
                    departmentCell.Cells.Count == 0)
                {
                    sb.AppendLine("Invalid Data");
                    continue;
                }

                var department = new Department
                {
                    Name = departmentCell.Name,
                    Cells = departmentCell.Cells.Select(x => new Cell
                    {
                        CellNumber = x.CellNumber,
                        HasWindow = x.HasWindow
                    })
                    .ToList()
                };
                departments.Add(department);
                sb.AppendLine($"Imported {department.Name} with {department.Cells.Count} cells");
            }

            context.Departments.AddRange(departments);
            context.SaveChanges();

            return sb.ToString();
        }

        public static string ImportPrisonersMails(SoftJailDbContext context, string jsonString)
        {
            var prisoners = new List<Prisoner>();

            var prisonerMails = JsonConvert.DeserializeObject<IEnumerable<PrisonerMailInputModel>>(jsonString);
            var sb = new StringBuilder();

            foreach(var prisonerMail in prisonerMails)
            {
                if (!IsValid(prisonerMail) ||
                    !prisonerMail.Mails.All(IsValid))
                {
                    sb.AppendLine("Invalid Data");
                    continue;
                }

                var incarcerationDate = DateTime.ParseExact(prisonerMail.IncarcerationDate,
                    "dd/MM/yyyy", CultureInfo.InvariantCulture);

                var isValidReleaseDate = DateTime.TryParseExact(prisonerMail.IncarcerationDate,
                    "dd/MM/yyyy",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out DateTime releaseDate);

                var prisoner = new Prisoner
                {
                    FullName = prisonerMail.FullName,
                    Nickname = prisonerMail.Nickname,
                    Age = prisonerMail.Age,
                    Bail = prisonerMail.Bail,
                    CellId = prisonerMail.CellId,
                    IncarcerationDate = incarcerationDate,
                    ReleaseDate = isValidReleaseDate ? (DateTime?)releaseDate : null,
                    Mails = prisonerMail.Mails.Select(x => new Mail
                    {
                        Description = x.Description,
                        Sender = x.Sender,
                        Address = x.Address
                    }).ToList()
                };
                prisoners.Add(prisoner);

                sb.AppendLine($"Imported {prisoner.FullName} {prisoner.Age} years old");
            }
            context.Prisoners.AddRange(prisoners);
            context.SaveChanges();

            return sb.ToString();
        }

        public static string ImportOfficersPrisoners(SoftJailDbContext context, string xmlString)
        {
            var sb = new StringBuilder();
            var officers = new List<Officer>();
            
            var serializer = new XmlSerializer(typeof(OfficerPrisonerInputModel[]), new XmlRootAttribute("Officers"));
            var officersPrisonersDto = serializer.Deserialize(new StringReader(xmlString)) as OfficerPrisonerInputModel[];

            foreach(var officerPrisoner in officersPrisonersDto)
            {
                if (!IsValid(officerPrisoner))
                {
                    sb.AppendLine("Invalid Data");
                    continue;
                }
                var officer = new Officer
                {
                    FullName = officerPrisoner.FullName,
                    Salary = officerPrisoner.Money,
                    Position = (Position)Enum.Parse(typeof(Position), officerPrisoner.Position),
                    Weapon = (Weapon)Enum.Parse(typeof(Weapon), officerPrisoner.Weapon),
                    DepartmentId = officerPrisoner.DepartmentId
                };
                foreach(var prisoner in officerPrisoner.Prisoners)
                {
                    officer.OfficerPrisoners.Add(new OfficerPrisoner
                    {
                        OfficerId = officer.Id,
                        PrisonerId = prisoner.Id
                    });
                }
                officers.Add(officer);
                sb.AppendLine($"Imported {officer.FullName} ({officer.OfficerPrisoners.Count} prisoners)");
            }
            context.Officers.AddRange(officers);
            context.SaveChanges();

            return sb.ToString();
        }

        private static bool IsValid(object obj)
        {
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(obj);
            var validationResult = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(obj, validationContext, validationResult, true);
            return isValid;
        }
    }
}