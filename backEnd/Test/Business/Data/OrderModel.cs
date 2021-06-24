using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data;

namespace SodaBackEnd.Business.Data
{
    public class OrderModel
    {
        public string Id { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Receiver { get; set; }
        public string Address { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Order { get; set; }
        public string State { get; set; }
        public int? Amount { get; set; }     
        public DateTime? CreateAt { get; set; }
      

    }
}
