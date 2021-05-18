using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Soda2Context _context;

        public UsersController(Soda2Context context)
        {
            _context = context;
        }

        public List<String> listToken { get; set; }= new List<string>();
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
        [HttpPost("signin")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
        public string Decode(string username,string password)
        {
            string input = username + password;
            char[] returnValue= input.ToCharArray();
            for(var i = 0; i < input.Length; i++)
            {
                returnValue[i] = (char)(input[i] + 29);
                
            }
            return new String(returnValue);

        }
        public bool Encode(string token)
        {
            return listToken.Contains(token);

        }

        // POST: api/login
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("login")]
        public async Task<LoginResponse> Login(LoginRequest user)
        {
            var response = new LoginResponse();
            var data = _context.Users.Where(s => s.Email == user.Email && s.Password == user.Password).FirstOrDefault();
            if (data == null) { response.Status = 0;
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
                var token=Decode(user.Email, user.Password);
                listToken.Add(token);
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
