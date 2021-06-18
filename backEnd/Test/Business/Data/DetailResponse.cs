using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class DetailResponse
    {
        public string Id { get; set; }
        public string OrderId { get; set; }
        public int? Qty { get; set; }
        public int? Price { get; set; }
       
        public string ProductDetailId { get; set; }
        public string DetailOrderId { get; set; }
        public int ItemAmount { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public string Image { get; set; }
    }
}
