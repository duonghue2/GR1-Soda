using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Test.Models
{
    public partial class OrderDetail
    {
        public string Id { get; set; }
        public string OrderId { get; set; }
        public int? Quantity { get; set; }
        public int? UnitPrice { get; set; }
        public string ProductDetailId { get; set; }
        public string ProductId { get; set; }
        public int ItemAmount { get; set; }
        public string ProductName { get; set; }
        public string Size { get; set; }
        public string Image { get; set; }
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
