using System;
using System.Collections.Generic;

#nullable disable

namespace Test.Models
{
    public partial class ProductImage
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public String ProductId { get; set; }

        public virtual Product Product { get; set; }
    }
}
