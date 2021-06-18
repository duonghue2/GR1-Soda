using Microsoft.AspNetCore.Mvc;
using SodaBackEnd.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class TokenController: ITokenService
    { public string Token { get; set; }
        public  string GetToken(string userId, string username)
        {
            string key = "duong_thi_hue_12345"; //Secret key which will be used later during validation    
            var issuer = "http://soda.com";  //normally this will be your site URL    


            return ComputeSHA256Hash(key + issuer + userId + username);
        }
        public  bool IsValidToken(string token, string userId, string userName)
        {
            return GetToken(userId, userName) == token;

        }
        public  string ComputeSHA256Hash(string text)
        {

            using (var sha256 = new SHA256Managed())
            {
                return BitConverter.ToString(sha256.ComputeHash(Encoding.UTF8.GetBytes(text))).Replace("-", "");
            }
        }

       
    }
}
