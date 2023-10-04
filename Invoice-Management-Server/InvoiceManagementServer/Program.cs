using Entities;
using InvoiceManagementServer.Converters;
using InvoiceManagementServer.CRUDServices;
using Microsoft.EntityFrameworkCore;

namespace InvoiceManagementServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

           

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
            }); ;

            builder.Services.ConfigureRepositoryWrapper();
            builder.Services.AddDbContext<RepositoryContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowedSpecificOrigins",
                                  policy =>
                                  {
                                      policy.WithOrigins(builder.Configuration["AllowedOrigins"]);
                                      policy.WithHeaders("authorization");
                                      policy.WithHeaders("content-type");
                                      policy.WithHeaders("params");
                                  });
            });

            builder.Services.AddTransient<AddInvoiceService>();
            builder.Services.AddTransient<EditInvoiceService>();


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.UseCors("AllowedSpecificOrigins");
            CreateDbIfNotExists(app);
            app.Run();
        }

        private static void CreateDbIfNotExists(IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<RepositoryContext>();
                DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred creating the DB.");
            }
        }
    }
}