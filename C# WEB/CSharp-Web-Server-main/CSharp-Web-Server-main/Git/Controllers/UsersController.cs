namespace Git.Controllers
{
    using Git.Models.Users;
    using Git.Services;
    using MyWebServer.Controllers;
    using MyWebServer.Http;
    using System.Threading.Tasks;
    using System.Linq;

    public class UsersController : Controller
    {
        private readonly IValidator validator;
        private readonly IUsersService usersService;

        public UsersController(
            IValidator validator,
            IUsersService usersService)
        {
            this.validator = validator;
            this.usersService = usersService;
        }

        public HttpResponse Login()
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Repositories/All");
            }

            return this.View();
        }

        [HttpPost]
        public HttpResponse Login(LoginUserFormModel model)
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Repositories/All");
            }

            string userId = this.usersService.LoginUser(model);
            if (userId == null)
            {
                return Error("Username or password is incorrect");
            }

            this.SignIn(userId);

            return Redirect("/Repositories/All");
        }


        public HttpResponse Register()
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Repositories/All");
            }

            return this.View();
        }

        [HttpPost]
        public HttpResponse Register(RegisterUserFormModel model)
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Repositories/All");
            }

            var modelErrors = this.usersService.RegisterUser(model);
            if (modelErrors.Count > 0)
            {
                return this.Error(modelErrors);
            }

            return this.Redirect("/Users/Login");
        }

        public HttpResponse Logout()
        {
            if (this.User.IsAuthenticated)
            {
                this.SignOut();
            }
            
            return Redirect("/");
        }
    }
}
