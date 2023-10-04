using Entities;
using System.Text.Json.Serialization;

namespace InvoiceManagementServer.Model
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public DateTime Date { get; set; }
        public int Amount { get; set; }
        public int Status { get; set; }

        public InvoiceDto(Invoice invoice) { 
            Id = invoice.Id;
            CustomerName = invoice.CustomerName;
            Date = invoice.Date;
            Amount = invoice.Amount;
            Status = invoice.Status;
        }

        [JsonConstructor]
        public InvoiceDto() { }
    }
}