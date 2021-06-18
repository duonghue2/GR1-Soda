using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class BaseTokenRequest
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
