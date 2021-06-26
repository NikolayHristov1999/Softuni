
namespace SharedTrip.Services
{
    using SharedTrip.ViewModels.Trips;
    using System.Collections.Generic;

    public interface ITripsService
    {
        ICollection<string> AddTrip(AddTripFormModel model, string userId);

        IEnumerable<ListTripViewModel> GetAllTrips();

        DetailsTripViewModel GetTripById(string id);

        bool AddUserToTrip(string tripId, string userId);
    }
}
