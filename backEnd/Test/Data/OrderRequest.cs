using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class OrderRequest:BaseRequest
    {
       
        public string Email { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Receiver { get; set; }
        public string? Ward { get; set; }
        public string Address { get; set; }
    }
}
