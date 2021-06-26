

namespace SharedTrip.Services
{

    using SharedTrip.Data;
    using SharedTrip.Models;
    using SharedTrip.ViewModels.Trips;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;

    public class TripsService : ITripsService
    {
        private readonly IValidator validator;
        private readonly ApplicationDbContext dbContext;

        public TripsService(
            IValidator validator,
            ApplicationDbContext dbContext)
        {
            this.validator = validator;
            this.dbContext = dbContext;
        }
        public ICollection<string> AddTrip(AddTripFormModel model, string userId)
        {
            var modelErrors = this.validator.ValidateTrip(model);

            if (modelErrors.Any())
            {
                return modelErrors;
            }

            var trip = new Trip
            {
                StartPoint = model.StartPoint,
                EndPoint = model.EndPoint,
                DepartureTime = DateTime.ParseExact(model.DepartureTime, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture),
                ImagePath = model.ImagePath,
                Seats = int.Parse(model.Seats),
                Description = model.Description,
            };

            dbContext.Trips.Add(trip);

            dbContext.SaveChanges();

            var userTrip = new UserTrip
            {
                UserId = userId,
                TripId = trip.Id,
            };

            dbContext.UserTrips.Add(userTrip);

            dbContext.SaveChanges();

            return modelErrors;
        }

        public bool AddUserToTrip(string tripId, string userId)
        {
            if (dbContext.UserTrips.Any(x => x.TripId == tripId && x.UserId == userId))
            {
                return false;
            }
            var trip = dbContext.Trips.FirstOrDefault(x => x.Id == tripId);

            if (trip == null || trip.Seats - trip.UserTrips.Count() <= 0)
            {
                return false;
            }

            if (!dbContext.Trips.Any(x => x.Id == tripId))
            {
                return false;
            }

            var userTrip = new UserTrip
            {
                UserId = userId,
                TripId = tripId,
            };

            dbContext.UserTrips.Add(userTrip);

            dbContext.SaveChanges();

            return true;
        }

        public IEnumerable<ListTripViewModel> GetAllTrips()
        {
            return this.dbContext.Trips
                .Select(x => new ListTripViewModel
                {
                    Id = x.Id,
                    StartPoint = x.StartPoint,
                    EndPoint = x.EndPoint,
                    DepartureTime = x.DepartureTime.ToString("dd.MM.yyyy" + " г. " + "HH:mm:ss", CultureInfo.InvariantCulture),
                    Seats = (x.Seats - x.UserTrips.Count() + 1).ToString()
                })
                .ToList();
        }

        public DetailsTripViewModel GetTripById(string id)
        {
            return this.dbContext.Trips
                .Where(x => x.Id == id)
                .Select(x => new DetailsTripViewModel
                {
                    Id = x.Id,
                    StartPoint = x.StartPoint,
                    EndPoint = x.EndPoint,
                    DepartureTime = x.DepartureTime.ToString("s", CultureInfo.InvariantCulture),
                    Description = x.Description,
                    Seats = (x.Seats - x.UserTrips.Count() + 1).ToString(),
                    ImagePath = x.ImagePath,
                })
                .FirstOrDefault();
        }
    }
}
