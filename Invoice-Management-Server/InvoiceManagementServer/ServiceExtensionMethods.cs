using Contracts.Repositories;
using Repository;

namespace InvoiceManagementServer
{
    public static class ServiceExtensions
    {
        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }     
    }
}
