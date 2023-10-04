using Contracts.Repositories;
using Contracts.Services;
using InvoiceManagementServer.Controllers;
using InvoiceManagementServer.Model;

namespace InvoiceManagementServer.CRUDServices
{
    public class EditInvoiceService : IEditEntityService<InvoiceDto>
    {
        private readonly IRepositoryWrapper _repository;
        private readonly ILogger<EditInvoiceService> _logger;


        public EditInvoiceService(IRepositoryWrapper repository, ILogger<EditInvoiceService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public void EditEntity(InvoiceDto invoiceDto)
        {
            try
            {
                _logger.LogInformation("Fetching invoice to update");

                var invoice = _repository.Invoice.FindByCondition(i => i.Id == invoiceDto.Id).FirstOrDefault();

                if (invoice == null)
                {
                    throw new Exception("Error updating invoice");
                }

                invoice.Id = invoiceDto.Id;
                invoice.CustomerName = invoiceDto.CustomerName;
                invoice.Status = invoiceDto.Status;
                invoice.Date = invoiceDto.Date;
                invoice.Amount = invoiceDto.Amount;

                _repository.Invoice.Update(invoice);
                _repository.Save();

                _logger.LogInformation($"Invoice {invoice.Id} updated");
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error updating invoice");
                throw;
            }
       

            
        }
    }
}