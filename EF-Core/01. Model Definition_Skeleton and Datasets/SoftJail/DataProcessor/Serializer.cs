namespace SoftJail.DataProcessor
{

    using Data;
    using Newtonsoft.Json;
    using SoftJail.DataProcessor.ExportDto;
    using System;
    using System.IO;
    using System.Linq;
    using System.Xml.Serialization;

    public class Serializer
    {
        public static string ExportPrisonersByCells(SoftJailDbContext context, int[] ids)
        {
            var result = context.Prisoners
                .Where(x => ids.Contains(x.Id))
                .Select(x => new
                {
                    Id = x.Id,
                    Name = x.FullName,
                    CellNumber = x.Cell.CellNumber,
                    Officers = x.PrisonerOfficers.Select(p => new
                    {
                        OfficerName = p.Officer.FullName,
                        Department = p.Officer.Department.Name
                    })
                    .OrderBy(x => x.OfficerName)
                    .ToList(),
                    TotalOfficerSalary = Math.Round(x.PrisonerOfficers.Sum(p => p.Officer.Salary), 2)
                })
                .OrderBy(x => x.Name)
                .ThenBy(x => x.Id)
                .ToList();

            return JsonConvert.SerializeObject(result,Formatting.Indented);
        }

        public static string ExportPrisonersInbox(SoftJailDbContext context, string prisonersNames)
        {
            var names = prisonersNames.Split(",");

            var result = context.Prisoners
                .Where(x => names.Contains(x.FullName))
                .Select(x => new PrisonerViewModel
                {
                    Id = x.Id,
                    Name = x.FullName,
                    IncarcerationDate = x.IncarcerationDate.ToString("yyyy-MM-dd"),
                    EncryptedMessages = x.Mails.Select(m => new EncryptedMessages
                    {
                        Description = string.Join("", m.Description.Reverse())
                    })
                    .ToArray()
                })
                .OrderBy(x => x.Name)
                .ThenBy(x => x.Id)
                .ToArray();

            var root = new XmlRootAttribute("Prisoners");
            var serializer = new XmlSerializer(typeof(PrisonerViewModel[]), root);
            var writer = new StringWriter();
            var namespacesSerializer = new XmlSerializerNamespaces();
            namespacesSerializer.Add("", "");

            using (writer) 
            {
                serializer.Serialize(writer, result, namespacesSerializer);
            }
            return writer.ToString();
            
        }
    }
}