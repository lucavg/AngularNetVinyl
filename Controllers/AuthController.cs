using Microsoft.AspNetCore.Mvc;

namespace AngularNetVinyl.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            return Ok("Success");
        }
    }
}
