using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace TeisterMask.DataProcessor.ExportDto
{
    [XmlType("Project")]
    public class ProjectXmlExportModel
    {
        [XmlAttribute("TasksCount")]
        public int TaskCount { get; set; }
        public string ProjectName { get; set; }
        public string HasEndDate { get; set; }
        [XmlArray]
        public TaskXmlExportModel[] Tasks { get; set; }
    }
}
