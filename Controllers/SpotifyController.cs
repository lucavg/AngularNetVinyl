using System.Diagnostics;
using System.Text;
using AngularNetVinyl.Dtos;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SpotifyAPI.Web;

namespace AngularNetVinyl.Controllers
{
    [ApiController]
    [Route("api/v1/spotify")]
    public class SpotifyController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly string clientId = string.Empty;
        private readonly string clientSecret = string.Empty;
        private readonly string tokenEndpoint = string.Empty;
        private AuthResponse _authResponse = new();

        public SpotifyController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;
            clientId = _configuration.GetValue<string>("SpotifySettings:ClientId")!;
            clientSecret = _configuration.GetValue<string>("SpotifySettings:ClientSecret")!;
            tokenEndpoint = "https://accounts.spotify.com/api/token";
        }

        [HttpGet("search/albums")]
        public async Task<IActionResult> SearchAlbums(string query)
        {
            if (_authResponse.Access_token == string.Empty || (DateTime.Now.AddSeconds(_authResponse.Expires_in) - _authResponse.Received_at).TotalSeconds > _authResponse.Expires_in)
            {
                await Authenticate();
            }

            string url = $"https://api.spotify.com/v1/search?q={query}&limit=36&type=album&market=BE";

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_authResponse.Access_token}");

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                return Ok(jsonResponse);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("search/artist")]
        public async Task<IActionResult> SearchArtist(string query)
        {
            if (_authResponse.Access_token == string.Empty || (DateTime.Now.AddSeconds(_authResponse.Expires_in) - _authResponse.Received_at).TotalSeconds > _authResponse.Expires_in)
            {
                await Authenticate();
            }

            string url = $"https://api.spotify.com/v1/search?q={query}&limit=36&type=artist&market=BE";

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_authResponse.Access_token}");

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                return Ok(jsonResponse);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet]
        [Route("get/album")]
        public async Task<IActionResult> GetAlbum(string query)
        {
            if (_authResponse.Access_token == string.Empty || (DateTime.Now.AddSeconds(_authResponse.Expires_in) - _authResponse.Received_at).TotalSeconds > _authResponse.Expires_in)
            {
                await Authenticate();
            }

            string url = $"https://api.spotify.com/v1/albums/{query}?market=BE";

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_authResponse.Access_token}");

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                return Ok(jsonResponse);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate()
        {
            try
            {
                var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

                var requestContent = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {authHeader}");

                var response = await _httpClient.PostAsync(tokenEndpoint, requestContent);
                response.EnsureSuccessStatusCode();

                var responseContent = await response.Content.ReadAsStringAsync();
                _authResponse = JsonConvert.DeserializeObject<AuthResponse>(responseContent)!;
                _authResponse.Received_at = DateTime.Now;

                return Ok(_authResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
