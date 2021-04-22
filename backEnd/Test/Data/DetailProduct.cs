using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class DetailProduct
    {       
        public string Id { get; set; }
        public string Size { get; set; }
        public int? Price { get; set; }
        public int? Quantity { get; set; }
        public string ProductId { get; set; }
        public string SubCategories { get; set; }
        public DetailProduct(string Id,string Size,int Price, int Quantity,string ProductId,string SubCategories)
        {
            this.Id = Id;
            this.Price = Price;
            this.Quantity = Quantity;
            this.ProductId = ProductId;
            this.SubCategories = SubCategories;
            this.Size = Size;
        }
    }
}
