using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data;

namespace SodaBackEnd.Data
{
    public class FilterRequest:BaseListRequest
    {
    
        public List<string> Gender { get; set; }
        public List<string> Category { get; set; }
        public int? PriceFrom { get; set; }
        public int? PriceTo { get; set; }
        public string Name { get; set; }
    }
}
