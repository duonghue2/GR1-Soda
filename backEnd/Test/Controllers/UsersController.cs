using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SodaBackEnd.Data;
using SodaBackEnd.Interfaces;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Soda2Context _context;
        private readonly ITokenService _tokenService;
        public UsersController(Soda2Context context)
        {
            _context = context;
            _tokenService = new TokenController();
        }

       
        // PUT: api/getUser/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("getUser/{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/sigin
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("signin")]
        public async Task<ActionResult<UserRequest>> PostUser(UserRequest user)
        {
          var isExist=  _context.Users.Where(s => s.Email == user.Email).FirstOrDefault();
            if (isExist != null) throw new ArgumentException("EMAIL_ALREADY_EXIST");
            var newUser = new User();
            newUser.Id = Guid.NewGuid().ToString();
            newUser.Name = user.Name;
            newUser.Email = user.Email;
            newUser.Phonenumber = user.Phonenumber;
            newUser.Password = _tokenService.ComputeSHA256Hash(user.Password);
         
            _context.Users.Add(newUser);          
                await _context.SaveChangesAsync();
        
            return CreatedAtAction("CreateUser", new { id = newUser.Id }, user);
        }
        



        // POST: api/login
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("login")]
        public async Task<LoginResponse> Login(LoginRequest user)
        {
            var response = new LoginResponse();
            //var text = user.Email + user.Password;
            //if (ComputeSHA256Hash(text) == user.Token)
            //{
            //    response.Status = 0;
            //    response.Message = "Email or password is wrong";
            //    response.Data = null;
            //    return response;
            //}
            
            var data = _context.Users.Where(s => s.Email == user.Email ).FirstOrDefault();
            var password = _tokenService.ComputeSHA256Hash(user.Password);
          
            if (data == null||data.Password!=password) { response.Status = 0;
                response.Message = "Email or password is wrong";
                response.Data = null;
                return response;
            }
            else
            { var userR = new UserData();
                userR.Email = data.Email;
                userR.Phone = data.Phonenumber;
                userR.UserName = data.Name;
                userR.UserId = data.Id;
                response.Status = 1;
                response.Message = "Succesfull login";
                
                response.Data = userR;
                var token = _tokenService.GetToken(userR.UserId, userR.UserName);
                response.token = token;
                return response;
            }
        }

        // DELETE: api/deleteUser/5
        [HttpDelete("deleteUser/{id}")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
