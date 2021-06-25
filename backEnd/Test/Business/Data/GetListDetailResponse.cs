using SodaBackEnd.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data;

namespace SodaBackEnd.Business.Data { 
    public class GetListDetailResponse : BaseTokenRequest
    {
        public string Name { get; set; }
        public int OriginPrice { get; set; }
        public bool IsActive { get; set; }
        public int? SalePrice { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string ProductDetailId { get; set; }
        public string ProductId { get; set; }
    }
}
