using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class DetailCartModel
    {
        public string DetailId { get; set; }
        public string Id { get; set; }
        public string Size { get; set; }
        public string? Name { get; set; }
        public int? Qty { get; set; }
        public int? Price { get; set; }
        public int? Amount { get; set; }
        public int? MaxQty { get; set; }
        public int OriginPrice { get; set; }
        public string Image { get; set; }
        public string ProductId { get; set; }
        public string ProductDetailId { get; set; }

    }
}
