using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using XL.Hyperion.Domain.Models;

namespace XL.Hyperion.Portal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScraperController : ControllerBase
    {
        private IConfiguration configuration;

        public ScraperController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("search")]
        public async Task<ActionResult> PostSearch(SearchConfig search)
        {
            try
            {
                var json = JsonSerializer.Serialize(search);

                string apiUrl = Environment.GetEnvironmentVariable("UrlApiSearch", EnvironmentVariableTarget.Process);
                string apiKey = Environment.GetEnvironmentVariable("KeyApiSearch", EnvironmentVariableTarget.Process);

                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Add("x-functions-key", apiKey);

                    HttpResponseMessage response = await client.PostAsync(apiUrl, new StringContent(json));
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();

                    return Ok(responseBody);
                }
            }
            catch (Exception ex)
            {
                //logger.LogError(ex, "xl-error: Error al ejecutar la búsqueda.");
                return null;
            }
        }

        [HttpPost]
        [Route("searchdetail")]
        public async Task<ActionResult> PostSearchDetail(ScraperConfig searchDetail)
        {
            try
            {
                var json = JsonSerializer.Serialize(searchDetail);

                string apiUrl = Environment.GetEnvironmentVariable("UrlApiSearchDetail", EnvironmentVariableTarget.Process);
                string apiKey = Environment.GetEnvironmentVariable("KeyApiSearchDetail", EnvironmentVariableTarget.Process);

                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Add("x-functions-key", apiKey);

                    HttpResponseMessage response = await client.PostAsync(apiUrl, new StringContent(json));
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();
                    
                    return Ok(responseBody);
                }
            }
            catch (Exception ex)
            {
                //logger.LogError(ex, "xl-error: Error al obtener información complementaria de un artículo.");
                return null;
            }
        }
    }
}
