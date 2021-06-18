using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class OrderResponse
    {
        public bool IsSuccess { get; set; }
        public string OrderID { get; set; }
    }
}
