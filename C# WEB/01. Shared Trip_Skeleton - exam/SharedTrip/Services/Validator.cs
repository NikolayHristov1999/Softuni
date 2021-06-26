namespace SharedTrip.Services
{
    using SharedTrip.Data;
    using SharedTrip.ViewModels.Trips;
    using SharedTrip.ViewModels.Users;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text.RegularExpressions;

    public class Validator : IValidator
    {
        public ICollection<string> ValidateTrip(AddTripFormModel model)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(model.StartPoint))
            {
                errors.Add($"Starting point is required");
            }

            if (string.IsNullOrWhiteSpace(model.EndPoint))
            {
                errors.Add($"End point is required");
            }

            var isValidDateTime = DateTime.TryParseExact(
                model.DepartureTime,
                "dd.MM.yyyy HH:mm",
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out var date);

            if (!isValidDateTime)
            {
                errors.Add($"Departure time {model.DepartureTime} is not a valid date time. Time must be in format (dd.MM.yyyy HH:mm)");
            }

            var isValidIntSeats = int.TryParse(model.Seats, out var seats);

            if (!isValidIntSeats || seats < 2 || seats > 6)
            {
                errors.Add($"Seats must be a valid digit between 2 and 6");
            }

            if (string.IsNullOrWhiteSpace(model.Description) || model.Description.Length > 80)
            {
                errors.Add($"A description is required and must be less and 80 symbols");
            }

            return errors;
        }

        public ICollection<string> ValidateUser(UserRegisterFormModel model)
        {
            var errors = new List<string>();
            
            if (model.Username.Length < DataConstants.UserMinUsername || model.Username.Length > DataConstants.DefaultMaxLength)
            {
                errors.Add($"Username length should be between {DataConstants.UserMinUsername} " +
                    $"and {DataConstants.DefaultMaxLength} symbols.");
            }

            if (!Regex.IsMatch(model.Email, DataConstants.RegexPatternEmail))
            {
                errors.Add($"Email {model.Email} is not a valid e-mail address.");
            }

            if (model.Password.Length < DataConstants.UserMinPassword
                || model.Password.Length > DataConstants.DefaultMaxLength)
            {
                errors.Add($"Password length should be between {DataConstants.UserMinPassword} and {DataConstants.DefaultMaxLength} symbols.");
            }

            if (!model.ConfirmPassword.Equals(model.Password))
            {
                errors.Add("Password and confirm password must match");
            }

            return errors;
        }
    }
}
