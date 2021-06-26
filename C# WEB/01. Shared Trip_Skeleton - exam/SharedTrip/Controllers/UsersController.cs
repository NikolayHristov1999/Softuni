namespace SharedTrip.Controllers
{
    using MyWebServer.Controllers;
    using MyWebServer.Http;
    using SharedTrip.Services;
    using SharedTrip.ViewModels.Users;

    public class UsersController : Controller
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        public HttpResponse Login()
        {
            if (this.User.IsAuthenticated)
            {
                return this.Redirect("/Trips/All");
            }

            return this.View();
        }

        [HttpPost]
        public HttpResponse Login(UserLoginFormModel model)
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Trips/All");
            }

            string userId = this.usersService.LoginUser(model);
            if (userId == null)
            {
                return Error("Username or password is incorrect");
            }

            this.SignIn(userId);

            return Redirect("/Trips/All");
        }

        public HttpResponse Register()
        {
            if (this.User.IsAuthenticated)
            {
                return this.Redirect("/Trips/All");
            }

            return this.View();
        }
        
        [HttpPost]
        public HttpResponse Register(UserRegisterFormModel model)
        {
            if (this.User.IsAuthenticated)
            {
                return this.Redirect("/Trips/All");
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
