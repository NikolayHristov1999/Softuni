namespace SharedTrip.Services
{
    using SharedTrip.Data;
    using SharedTrip.Models;
    using SharedTrip.ViewModels.Users;
    using System.Collections.Generic;
    using System.Linq;

    public class UsersService : IUsersService
    {
        private readonly IValidator validator;
        private readonly IPasswordHasher passwordHasher;
        private readonly ApplicationDbContext dbcontext;

        public UsersService(
            IValidator validator,
            IPasswordHasher passwordHasher,
            ApplicationDbContext dbcontext)
        {
            this.validator = validator;
            this.passwordHasher = passwordHasher;
            this.dbcontext = dbcontext;
        }

        public string LoginUser(UserLoginFormModel model)
        {
            var password = passwordHasher.HashPassword(model.Password);

            var user = this.dbcontext.Users.FirstOrDefault(x => x.Password == password && x.Username == model.Username);

            return user != null ? user.Id : null;
        }

        public ICollection<string> RegisterUser(UserRegisterFormModel model)
        {
            var modelErrors = this.validator.ValidateUser(model);

            if (this.dbcontext.Users.Any(u => u.Username == model.Username))
            {
                modelErrors.Add($"User with '{model.Username}' username already exists.");
            }

            if (this.dbcontext.Users.Any(u => u.Email == model.Email))
            {
                modelErrors.Add($"User with '{model.Email}' e-mail already exists.");
            }

            if (modelErrors.Any())
            {
                return modelErrors;
            }

            var user = new User
            {
                Username = model.Username,
                Password = this.passwordHasher.HashPassword(model.Password),
                Email = model.Email,
            };

            dbcontext.Users.Add(user);

            dbcontext.SaveChanges();

            return modelErrors;
        }
    }
}
