using System.ComponentModel.DataAnnotations.Schema;

namespace Entities
{
    public class Invoice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public DateTime Date { get; set; }
        public int Amount { get; set; }
        public int Status { get; set; }

    }
}
