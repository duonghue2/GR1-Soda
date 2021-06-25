using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Business.Data
{
    public class CreateProductModel
    { public string Name { get; set; }
        public int Price { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public List<Detail> detail { get; set; }
        public List<string> Url { get; set; }
        public class Detail
        {
            public string Size { get; set; }
            public int? Price { get; set; }
            public int? Quantity { get; set; }
            public string SubCategories { get; set; }
          
        }
    }
}
