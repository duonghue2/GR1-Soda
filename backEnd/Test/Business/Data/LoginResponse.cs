using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class LoginResponse:BaseResponse<UserData>
    { public string token { get; set; }
       
    }
}
