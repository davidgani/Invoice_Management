namespace Contracts.Services
{
    public interface IEditEntityService<TEntity> where TEntity : class
    {
        public void EditEntity(TEntity entity);
    }
}
