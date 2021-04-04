namespace TeisterMask.DataProcessor
{
    using System;
    using System.Collections.Generic;

    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using Data;
    using Newtonsoft.Json;
    using TeisterMask.Data.Models;
    using TeisterMask.Data.Models.Enums;
    using TeisterMask.DataProcessor.ImportDto;
    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedProject
            = "Successfully imported project - {0} with {1} tasks.";

        private const string SuccessfullyImportedEmployee
            = "Successfully imported employee - {0} with {1} tasks.";

        public static string ImportProjects(TeisterMaskContext context, string xmlString)
        {
            var sb = new StringBuilder();

            var xmlSerializer = new XmlSerializer(typeof(ProjectImportModel[]), new XmlRootAttribute("Projects"));
            var projects = (ProjectImportModel[])xmlSerializer.Deserialize(new StringReader(xmlString));

            foreach(var projectDto in projects)
            {

                if (!IsValid(projectDto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                bool parsedOpenDate = DateTime.TryParseExact(
                    projectDto.OpenDate, "dd/MM/yyyy",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out var date);
                bool parsedBoolDueDate = DateTime.TryParseExact(projectDto.DueDate, "dd/MM/yyyy",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDueDate);
                if (!parsedOpenDate)
                {
                    sb.AppendLine("Invalid Data");
                    continue;
                }

                var project = new Project
                {
                    Name = projectDto.Name,
                    OpenDate = date,
                };
                //Add appropriate date for due date or null if it is not given
                if (parsedBoolDueDate)
                {
                    project.DueDate = parsedDueDate;
                }
                else
                {
                    project.DueDate = null;
                }

                foreach (var taskdto in projectDto.Tasks)
                {
                    if (!IsValid(taskdto))
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }
                    //Get appropriate dates
                    bool taskOpenDate = DateTime.TryParseExact(
                        taskdto.OpenDate, "dd/MM/yyyy",
                        CultureInfo.InvariantCulture, DateTimeStyles.None, out var openDate);
                    bool taskDueDate = DateTime.TryParseExact(
                        taskdto.DueDate, "dd/MM/yyyy",
                        CultureInfo.InvariantCulture, DateTimeStyles.None, out var dueDate);
                    bool dueDateProject = project.DueDate != null ? project.DueDate < dueDate : false;


                    if (!taskOpenDate || !taskOpenDate || 
                        project.OpenDate > openDate || dueDateProject)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }
                    var task = new Task
                    {
                        Name = taskdto.Name,
                        OpenDate = openDate,
                        DueDate = dueDate,
                        ExecutionType = (ExecutionType)taskdto.ExecutionType,
                        LabelType = (LabelType)taskdto.LabelType
                    };
                    project.Tasks.Add(task);
                }

                context.Projects.Add(project);
                sb.AppendLine(String.Format(SuccessfullyImportedProject, project.Name, project.Tasks.Count));

            }
            context.SaveChanges();
            return sb.ToString();
        }

        public static string ImportEmployees(TeisterMaskContext context, string jsonString)
        {
            var sb = new StringBuilder();
            var employeesDto = JsonConvert.DeserializeObject<IEnumerable<EmployeeImportModel>>(jsonString);
            var tasks = context.Tasks.Select(x => x.Id);

            foreach(var employeeDto in employeesDto)
            {
                if (!IsValid(employeeDto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                var employee = new Employee
                {
                    Username = employeeDto.Username,
                    Email = employeeDto.Email,
                    Phone = employeeDto.Phone,
                };
                foreach(var i in employeeDto.Tasks.Distinct())
                {
                    if (tasks.Contains(i))
                    {
                        employee.EmployeesTasks.Add(new EmployeeTask
                        {
                            EmployeeId = employee.Id,
                            TaskId = i
                        });
                    }
                    else
                    {
                        sb.AppendLine(ErrorMessage);
                    }
                }
                context.Employees.Add(employee);
                sb.AppendLine(String.Format(SuccessfullyImportedEmployee, employee.Username, employee.EmployeesTasks.Count));
            }
            context.SaveChanges();
            return sb.ToString();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }
    }
}