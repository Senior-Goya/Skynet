using System.Linq;
using API.Errors;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
              services.AddScoped<IProductRespository, ProductRespository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GemericRepository<>)));
                  services.Configure<ApiBehaviorOptions>(options => 
            {
                options.InvalidModelStateResponseFactory = actionContext => 
                {
                    var errors = actionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(X => X.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {

                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };

            });

            return services;
        }
        
    }
}