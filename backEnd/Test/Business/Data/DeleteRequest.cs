using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class DeleteRequest:BaseTokenRequest
    {
       
        public string Id { get; set; }
    }
}
