using SodaBackEnd.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class BaseListRequest :BaseTokenRequest
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 12;

    }
}
