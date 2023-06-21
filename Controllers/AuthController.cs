﻿using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using AngularNetVinyl.Data;
using AngularNetVinyl.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.IdentityModel.Tokens;

namespace AngularNetVinyl.Controllers
{
    [ApiController]
    [Route("api/v1/authenticate")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AuthController(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Route("createRole")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            var appRole = new Role
            {
                Name = request.Role
            };
            var createRole = await _roleManager.CreateAsync(appRole);

            if (!createRole.Succeeded)
            {
                return BadRequest(new { message = "Role creation failed" });
            }

            return Ok(new { message = "Role created successfully" });
        }

        [HttpPost]
        [Route("register")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(RegisterResponse))]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await RegisterAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var userExists = await _userManager.FindByEmailAsync(request.Email);
                if (userExists != null)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        Message = "User already exists!"
                    };
                }

                userExists = new User()
                {
                    Email = request.Email,
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    UserName = request.Username
                };

                var createUserResults = await _userManager.CreateAsync(userExists, request.Password);
                if (!createUserResults.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        Message = $"User creation failed: {createUserResults?.Errors.First()?.Description}"
                    };
                }

                var addUserToRoleResult = await _userManager.AddToRoleAsync(userExists, "User");
                if (!addUserToRoleResult.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        Message = $"User creation succeeded but could not add user to role: {addUserToRoleResult?.Errors.First()?.Description}"
                    };
                }

                return new RegisterResponse
                {
                    Success = true,
                    Message = "User registered successfully!"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new RegisterResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await LoginAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid credentials"
                    };
                }
                var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(30);
                var token = new JwtSecurityToken(
                    "https://localhost:5001",
                    "https://localhost:5001",
                    claims,
                    expires: expires,
                    signingCredentials: creds
                );

                return new LoginResponse
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login successful",
                    Email = user.Email!,
                    Success = true,
                    UserId = user.Id.ToString(),
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new LoginResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
    }
}

