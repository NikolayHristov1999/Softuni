namespace TeisterMask.DataProcessor
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Xml.Serialization;
    using Data;
    using Newtonsoft.Json;
    using TeisterMask.DataProcessor.ExportDto;
    using Formatting = Newtonsoft.Json.Formatting;

    public class Serializer
    {
        //Export all projects that have at least one task.For each project, export its name, tasks count, and if it has end(due) date which is represented like "Yes" and "No". For each task, export its name and label type.Order the tasks by name (ascending). Order the projects by tasks count (descending), then by name (ascending).
        public static string ExportProjectWithTheirTasks(TeisterMaskContext context)
        {
            var projects = context.Projects.ToList()
                .Where(x => x.Tasks.Any())
                .Select(x => new ProjectXmlExportModel
                {
                    TaskCount = x.Tasks.Count,
                    ProjectName = x.Name,
                    HasEndDate = x.DueDate == null ? "No" : "Yes",
                    Tasks = x.Tasks.Select(task => new TaskXmlExportModel
                    {
                        Name = task.Name,
                        Label = task.LabelType.ToString()
                    })
                    .OrderBy(n => n.Name)
                    .ToArray()
                })
                .OrderByDescending(x => x.TaskCount)
                .ThenBy(x => x.ProjectName)
                .ToArray();

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ProjectXmlExportModel[]),new XmlRootAttribute("Projects"));
            var sw = new StringWriter();
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            xmlSerializer.Serialize(sw, projects, ns);
            return sw.ToString();

        }


        public static string ExportMostBusiestEmployees(TeisterMaskContext context, DateTime date)
        {
            var employees = context.Employees.ToList()
                .Where(x => x.EmployeesTasks.Any(et => et.Task.OpenDate >= date))
                .Select(x => new
                {
                    Username = x.Username,
                    Tasks = x.EmployeesTasks.Where(et => et.Task.OpenDate >= date)
                        .OrderByDescending(et => et.Task.DueDate)
                        .ThenBy(et => et.Task.Name)
                        .Select(et => new
                        {
                            TaskName = et.Task.Name,
                            OpenDate = et.Task.OpenDate.ToString("MM/dd/yyyy"),
                            DueDate = et.Task.DueDate.ToString("MM/dd/yyyy"),
                            LabelType = et.Task.LabelType.ToString(),
                            ExecutionType = et.Task.ExecutionType.ToString()
                        })
                        .ToArray()
                })
                .OrderByDescending(x => x.Tasks.Count())
                .ThenBy(x => x.Username)
                .Take(10)
                .ToArray();

            return JsonConvert.SerializeObject(employees, Formatting.Indented);
        }
    }
}