using Contracts.Repositories;
using Contracts.Services;
using Entities;
using InvoiceManagementServer.Controllers;
using InvoiceManagementServer.Model;

namespace InvoiceManagementServer.CRUDServices
{
    public class AddInvoiceService : IAddEntityService<InvoiceDto>
    {
        private readonly IRepositoryWrapper _repository;
        private readonly ILogger<AddInvoiceService> _logger;

        public AddInvoiceService(IRepositoryWrapper repository, ILogger<AddInvoiceService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public void AddEntity(InvoiceDto invoiceDto)
        {
            try
            {
                _logger.LogInformation("Adding new invoice");

                var invoice = new Invoice
                {
                    CustomerName = invoiceDto.CustomerName,
                    Status = invoiceDto.Status,
                    Date = invoiceDto.Date,
                    Amount = invoiceDto.Amount,
                };

                _repository.Invoice.Create(invoice);

                _repository.Save();

                _logger.LogInformation("Invoice succesfully added");
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error adding invoice");

                throw;
            }
            
        }
    }
}
