using SharedTrip.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedTrip.Services
{
    public interface IUsersService
    {
        ICollection<string> RegisterUser(UserRegisterFormModel model);

        string LoginUser(UserLoginFormModel model);
    }
}
