﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Models;

namespace SodaBackEnd.Data
{
    public class UpdateCartRequest:BaseTokenRequest
    {
      public  List<Cart> ListCart { get; set; }
    }
}
