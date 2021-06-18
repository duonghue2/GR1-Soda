using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class CartResponse
    { 
        public List<DetailCartModel> ListProduct { get; set; }
        public int Total { get; set; }
    }
}
