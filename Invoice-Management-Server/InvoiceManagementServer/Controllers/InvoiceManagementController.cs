using Contracts.Repositories;
using InvoiceManagementServer.CRUDServices;
using InvoiceManagementServer.Exceptions;
using InvoiceManagementServer.Model;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceManagementServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceManagementController : ControllerBase
    {
        private readonly ILogger<InvoiceManagementController> _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly AddInvoiceService _addInvoiceService;
        private readonly EditInvoiceService _editInvoiceService;

        public InvoiceManagementController(ILogger<InvoiceManagementController> logger, 
                                           IRepositoryWrapper repository,
                                           AddInvoiceService addInvoiceService,
                                           EditInvoiceService editInvoiceService)
        {
            _logger = logger;
            _repository = repository;   
            _addInvoiceService = addInvoiceService;
            _editInvoiceService = editInvoiceService;
        }

        [HttpGet("GetInvoices")]
        public List<InvoiceDto> GetInvoices()
        {
            _logger.LogInformation("Fetching invoices");

            return  _repository.Invoice.FindAll().ToList().ConvertAll(i => new InvoiceDto(i));
        }

        [HttpPost("AddInvoice")] 
        public ActionResult AddInvoice(InvoiceDto invoice)
        {
            try
            {
                ValidateInvoice(invoice);
                _addInvoiceService.AddEntity(invoice);

                return Ok();
            }
            catch (InvalidInvoiceException e)
            {
                return BadRequest(e.Message); 
            }
            catch(Exception) 
            {
                return BadRequest("Error adding the invoice to the database");
            }
        }

        [HttpPost("EditInvoice")]
        public ActionResult EditInvoice(InvoiceDto invoice)
        {
            try
            {
                ValidateInvoice(invoice);
                _editInvoiceService.EditEntity(invoice);

                return Ok();
            }
            catch (InvalidInvoiceException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception)
            {
                return BadRequest("Error updating the invoice in the database");
            }
        }



        private void ValidateInvoice(InvoiceDto invoice)
        {
            _logger.LogInformation($"Invoice: {invoice.Id} being validated");

            if (invoice.Date < DateTime.Today)
            {
                throw new Exception("Given date cannot be earlier than today");
            }

            if (invoice.Amount < 0)
            {
                throw new Exception("Amount to pay cannot be a negative number");
            }
        }
    }
}