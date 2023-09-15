using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ParkAwayServer.Models;

namespace ParkAwayServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly ParkContext _context;
        private readonly Settings _settings;
        public UsersController(ParkContext context,UserManager<Users> userManager,IOptions<Settings> appsettings)
        {
            _context = context;
            _userManager= userManager;
            _settings= appsettings.Value;
        }

        

        // GET: api/ParkingTichets

        // POST: api/ParkingTichets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> PostUsers(UserModel model)
        {
            var applicationuser = new Users()
            {   
                UserName = model.Username,
                name = model.Name,
                lastname = model.LastName,
                Email = model.Email,
                street = model.Street,
                city = model.City,
                streetnumber = model.StreetNumber,
                PhoneNumber = model.PhoneNumber,
                userTypeAcc = model.userTypeAcc

            };
            try
            {
                var result = await _userManager.CreateAsync(applicationuser, model.Password);
                return Ok(result);
            }

            catch (Exception excep)
            {

                throw excep;
            }

        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Users>> GetUser(string Id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var User = await _context.Users.FindAsync(Id);

            if (User == null)
            {
                return NotFound();
            }

            return User;
        }

        [Route("login")]
        [HttpPost]

        public async Task<IActionResult> Login(LoginModel model)
        {
            var secret = "1234567890123456";
            var user = await _userManager.FindByNameAsync(model.UserName);
            
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {

                        new Claim("Id", user.Id.ToString()),
                        new Claim("Name",user.name.ToString()),
                        

                    }),

                    Expires = DateTime.UtcNow.AddHours(8),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(secret)), SecurityAlgorithms.HmacSha256Signature)

                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorect." });
            }

        }
        [Route("logout")]
        [HttpPost]


        public async Task<ActionResult> LogOut()
        {
            HttpContext.Request.Headers.Remove("Authorization");

            await HttpContext.SignOutAsync();

            return Ok();

        }
    }
}


