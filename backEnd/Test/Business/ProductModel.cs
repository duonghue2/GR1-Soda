using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Models;

namespace Test.Business
{
    public class ProductModel
    {
        public string Id { get; set; }
        public int? OriginPrice { get; set; }

        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Images { get; set; }
        public List<ProductDetail> Detail { get; set; }
    }
}
