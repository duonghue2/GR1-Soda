using SodaBackEnd.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class AddCartRequest: BaseTokenRequest
    {
        public string? Id { get; set; }
        public string ProductDetailId { get; set; }
        public int? Quantity { get; set; }
        public int? Amount { get; set; }
        
    }
}
