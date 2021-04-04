using System.Xml.Serialization;

namespace CarDealer.DTO
{
    [XmlType("partId")]
    public class CarsPartsInputModel
    {
        [XmlAttribute("id")]
        public int Id { get; set; }

    }
}