using Contracts;
using Contracts.Repositories;
using Entities;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _repoContext;
        private IInvoiceRepository _invoice;

        public IInvoiceRepository Invoice
        {
            get
            {
                _invoice ??= new InvoiceRepository(_repoContext);

                return _invoice;
            }
        }

        public RepositoryWrapper(RepositoryContext repositoryContext) => _repoContext = repositoryContext;

        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}