using Contracts;
using Entities;

namespace Repository
{
    public class InvoiceRepository: RepositoryBase<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}