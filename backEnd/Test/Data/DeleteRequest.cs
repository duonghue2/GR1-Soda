﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaBackEnd.Data
{
    public class DeleteRequest:BaseRequest
    {
       
        public string Id { get; set; }
    }
}
