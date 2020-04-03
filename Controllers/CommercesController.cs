using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace XL.Hyperion.Portal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommercesController : ControllerBase
    {
        private IConfiguration configuration;

        public CommercesController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                string apiUrl = Environment.GetEnvironmentVariable("UrlApiGetCommerces", EnvironmentVariableTarget.Process);
                string apiKey = Environment.GetEnvironmentVariable("KeyApiGetCommerces", EnvironmentVariableTarget.Process);

                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Add("x-functions-key", apiKey);

                    HttpResponseMessage response = await client.GetAsync(apiUrl);
                    var responseBody = await response.Content.ReadAsStringAsync();
                    
                    return Ok(responseBody);
                }
            } 
            catch (Exception ex)
            {
                //logger.LogError(ex, "xl-error: Error al obtener los comercios.");
                return null;
            }
        }
    }
}
