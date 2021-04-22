using System;
using System.Collections.Generic;

#nullable disable

namespace Test.Models
{
    public partial class Cart
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string ProductDetailId { get; set; }
        public int? Quantity { get; set; }
        public int? Amount { get; set; }

        public virtual ProductDetail ProductDetail { get; set; }
        public virtual User User { get; set; }
    }
}
