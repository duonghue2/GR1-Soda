using System;
using System.Collections.Generic;

#nullable disable

namespace Test.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public string Id { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Receiver { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string UserId { get; set; }
        public string State { get; set; }
        public int? Total { get; set; }
        public int? Amount { get; set; }
        public int? ShippingCost { get; set; }
        public int? Discount { get; set; }
        public DateTime? CreateAt { get; set; }
        public string ModifyBy { get; set; }
       
        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
