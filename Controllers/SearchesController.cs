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
    public class SearchesController : ControllerBase
    {
        private IConfiguration configuration;

        public SearchesController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPut]
        public async Task<ActionResult> Put(Search search)
        {
            try
            {
                search.Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time (Mexico)"));
                if (search.Id == Guid.Empty)
                {
                    search.Schedule.LastExecution = search.Date.AddDays(-1);
                    search.Id = Guid.NewGuid();
                }

                search.Schedule.DateUntil = search.Schedule.DateUntil.AddMinutes(-1);
                if(search.Date.Year == search.Schedule.DateSince.Year && search.Date.Month == search.Schedule.DateSince.Month &&search.Date.Day == search.Schedule.DateSince.Day)
                {
                    search.Schedule.DateSince = search.Schedule.DateSince.AddHours(search.Date.Hour).AddMinutes(search.Date.Minute);
                }

                var json = JsonSerializer.Serialize(search);

                string apiUrl = Environment.GetEnvironmentVariable("UrlApiSetSearch", EnvironmentVariableTarget.Process);
                string apiKey = Environment.GetEnvironmentVariable("KeyApiSetSearch", EnvironmentVariableTarget.Process);

                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Add("x-functions-key", apiKey);

                    HttpResponseMessage response = await client.PutAsync(apiUrl, new StringContent(json));
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();

                    return Ok(responseBody);
                }
            }
            catch (Exception ex)
            {
                //logger.LogError(ex, "xl-error: Error al programar la búsqueda.");
                return null;
            }
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                string apiUrl = Environment.GetEnvironmentVariable("UrlApiGetSearches", EnvironmentVariableTarget.Process);
                string apiKey = Environment.GetEnvironmentVariable("KeyApiGetSearches", EnvironmentVariableTarget.Process);

                using (HttpClient client = new HttpClient())
                {
                    var options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        WriteIndented = true
                    };

                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Add("x-functions-key", apiKey);

                    HttpResponseMessage response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();

                    return Ok(responseBody);
                }
            }
            catch (Exception ex)
            {
                //logger.LogError(ex, "xl-error: Error al obtener el listado de búsquedas.");
                return null;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(Guid id)
        {
            try
            {
                string apiUrl = Environment.GetEnvironmentVariable("UrlApiGetSearch", EnvironmentVariableTarget.Process).Replace("{id}", id.ToString());
                string apiKey = Environment.GetEnvironmentVariable("KeyApiGetSearch", EnvironmentVariableTarget.Process);

                using (HttpClient client = new HttpClient())
                {
                    var options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        WriteIndented = true
                    };

                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Add("x-functions-key", apiKey);

                    HttpResponseMessage response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();

                    return Ok(responseBody);
                }
            }
            catch (Exception ex)
            {
                //logger.LogError(ex, "xl-error: Error al recuperar la búsqueda.");
                return null;
            }
        }
    }
}