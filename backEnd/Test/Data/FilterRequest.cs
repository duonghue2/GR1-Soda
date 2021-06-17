using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class FilterRequest
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 12;
        public List<string> Gender { get; set; }
        public List<string> Category { get; set; }
        public int? PriceFrom { get; set; }
        public int? PriceTo { get; set; }
        public string Name { get; set; }
    }
}
