#nullable disable

using System;
using System.Collections.Generic;

namespace Test.Models
{
    public partial class ProductDetail
    {
        //public ProductDetail()
        //{
        //    Carts = new HashSet<Cart>();
        //}

        public string Id { get; set; }
        public string Size { get; set; }
        public int? Price { get; set; }
        public int? Quantity { get; set; }
        public string ProductId { get; set; }
        public string SubCategories { get; set; }
        public bool IsActive { get; set; }
        //public virtual Product Product { get; set; }
        //public virtual ICollection<Cart> Carts { get; set; }
    }
}
