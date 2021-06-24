using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data;

namespace SodaBackEnd.Business.Data
{
    public class ListProductDetailRequest :BaseListRequest
    {
        public string Name { get; set; }
        
    }
}
