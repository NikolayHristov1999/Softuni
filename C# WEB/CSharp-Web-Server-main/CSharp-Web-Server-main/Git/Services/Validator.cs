
using Git.Models.Repositories;
using Git.Models.Users;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Git.Services
{
    public class Validator : IValidator
    {
        public ICollection<string> ValidateRepository(RepositoryCreateFormModel model)
        {
            var errors = new List<string>();
            if (model.Name.Length < 3 || model.Name.Length > 10)
            {
                errors.Add("Name should be between 3 and 10 symbols");
            }

            return errors;
        }

        public ICollection<string> ValidateUser(RegisterUserFormModel model)
        {
            var errors = new List<string>();
            var regexPatternEmail = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            if (model.Username.Length < 5 || model.Username.Length > 20)
            {
                errors.Add("Username length should be between 5 and 20 symbols.");
            }

            if (!Regex.IsMatch(model.Email, regexPatternEmail))
            {
                errors.Add($"Email {model.Email} is not a valid e-mail address.");
            }

            if(model.Password.Length < 6 || model.Password.Length > 20)
            {
                errors.Add("Password length should be between 6 and 20 symbols.");
            }

            if (!model.ConfirmPassword.Equals(model.Password))
            {
                errors.Add("Password and confirm password must match");
            }

            return errors;
        }
    }
}
