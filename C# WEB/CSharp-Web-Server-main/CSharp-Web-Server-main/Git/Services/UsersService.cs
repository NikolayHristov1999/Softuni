using Git.Data;
using Git.Data.Models;
using Git.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Git.Services
{
    public class UsersService : IUsersService
    {
        private readonly IValidator validator;
        private readonly PasswordHasher passwordHasher;
        private readonly GitDbContext dbcontext;

        public UsersService(
            IValidator validator,
            PasswordHasher passwordHasher,
            GitDbContext dbcontext)
        {
            this.validator = validator;
            this.passwordHasher = passwordHasher;
            this.dbcontext = dbcontext;
        }

        public string LoginUser(LoginUserFormModel model)
        {
            var password = passwordHasher.HashPassword(model.Password);

            var user = this.dbcontext.Users.FirstOrDefault(x => x.Password == password && x.Username == model.Username);

            return user != null ? user.Id : null;
        }

        public ICollection<string> RegisterUser(RegisterUserFormModel model)
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
