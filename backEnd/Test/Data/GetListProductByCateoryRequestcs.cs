﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class GetListProductByCateoryRequestcs
    {
        public int Page { get; set; }
        public int Limit { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
    }
}
