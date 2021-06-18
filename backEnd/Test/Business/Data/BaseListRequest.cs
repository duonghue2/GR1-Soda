using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class BaseListRequest
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 12;

    }
}
