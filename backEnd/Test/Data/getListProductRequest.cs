using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class getListProductRequest
    {
        public int Page { get; set; }
        public int Limit { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
    }
}
