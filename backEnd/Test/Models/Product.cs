using System;
using System.Collections.Generic;

#nullable disable

namespace Test.Models
{
    public partial class Product
    {
        //public Product()
        //{
        //    OrderDetails = new HashSet<OrderDetail>();
        //    ProductDetails = new HashSet<ProductDetail>();
        //}

        public String Id { get; set; }
        public int Price { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<ProductDetail> ProductDetails { get; set; }
    }
}
