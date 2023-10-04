using Microsoft.Extensions.Logging;

namespace Contracts.Services
{
    public interface IAddEntityService<TEntity> where TEntity : class
    {
        public void AddEntity(TEntity entity);
    }
}
