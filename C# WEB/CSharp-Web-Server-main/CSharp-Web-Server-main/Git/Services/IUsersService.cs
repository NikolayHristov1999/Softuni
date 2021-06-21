using Git.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Git.Services
{
    public interface IUsersService
    {
        ICollection<string> RegisterUser(RegisterUserFormModel model);

        string LoginUser(LoginUserFormModel model);
    }
}
