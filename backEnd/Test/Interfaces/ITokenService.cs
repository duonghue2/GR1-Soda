using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Interfaces
{
   public interface ITokenService
    {

        public string GetToken(string userId, string username);


        public bool IsValidToken(string token, string userId, string userName);


        public string ComputeSHA256Hash(string text);
      
    }
}
