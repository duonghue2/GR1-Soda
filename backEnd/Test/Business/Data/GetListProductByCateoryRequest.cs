﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class GetListProductByCateoryRequest:BaseListRequest
    {
        public string Category { get; set; }
        public string SubCategory { get; set; }
    }
}
