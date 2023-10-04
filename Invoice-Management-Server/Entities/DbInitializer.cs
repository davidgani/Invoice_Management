namespace Entities
{
    public static class DbInitializer
    {
        public static void Initialize(RepositoryContext context)
        {
            context.Database.EnsureCreated();

            if (context.Invoices.Any())
            {
                return;
            }

            context.Invoices.AddRange(GetInvoices());

            context.SaveChanges();
        }

        private static List<Invoice> GetInvoices()
        {

            return new List<Invoice>
        {
            new Invoice
            {
                Id = 1,
                CustomerName = "Customer 1",
                Date = new DateTime(2023, 9, 1),
                Amount = 100,
                Status = 0
            },
            new Invoice
            {
                Id = 2,
                CustomerName = "Customer 2",
                Date = new DateTime(2023, 9, 2),
                Amount = 150,
                Status = 1
            },
            new Invoice
            {
                Id = 3,
                CustomerName = "Customer 3",
                Date = new DateTime(2023, 9, 3),
                Amount = 200,
                Status = 0
            },
            new Invoice
            {
                Id = 4,
                CustomerName = "Customer 4",
                Date = new DateTime(2023, 9, 4),
                Amount = 75,
                Status = 1
            },
            new Invoice
            {
                Id = 5,
                CustomerName = "Customer 5",
                Date = new DateTime(2023, 9, 5),
                Amount = 180,
                Status = 0
            },
            new Invoice
            {
                Id = 6,
                CustomerName = "Customer 6",
                Date = new DateTime(2023, 9, 6),
                Amount = 90,
                Status = 1
            },
            new Invoice
            {
                Id = 7,
                CustomerName = "Customer 7",
                Date = new DateTime(2023, 9, 7),
                Amount = 220,
                Status = 0
            },
            new Invoice
            {
                Id = 8,
                CustomerName = "Customer 8",
                Date = new DateTime(2023, 9, 8),
                Amount = 130,
                Status = 1
            },
            new Invoice
            {
                Id = 9,
                CustomerName = "Customer 9",
                Date = new DateTime(2023, 9, 9),
                Amount = 250,
                Status = 0
            },
            new Invoice
            {
                Id = 10,
                CustomerName = "Customer 10",
                Date = new DateTime(2023, 9, 10),
                Amount = 120,
                Status = 1
            }
        };
        }
    }
}