using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data;
using Test.Models;

namespace SodaBackEnd.Data
{
    public class PurchaseHistoryResponse
    { public List<DetailResponse> Details { get; set; }
        public Order Order { get; set; }
    }
}
