
namespace SharedTrip.Controllers
{
    using MyWebServer.Controllers;
    using MyWebServer.Http;
    using SharedTrip.Services;
    using SharedTrip.ViewModels.Trips;
    using System;

    public class TripsController : Controller
    {
        private readonly ITripsService tripsService;

        public TripsController(ITripsService tripsService)
        {
            this.tripsService = tripsService;
        }

        [Authorize]
        public HttpResponse All()
        {
            var model = this.tripsService.GetAllTrips();

            return this.View(model);
        }

        [Authorize]
        public HttpResponse Add()
        {
            return this.View();
        }

        [Authorize]
        [HttpPost]
        public HttpResponse Add(AddTripFormModel model)
        {
            var modelErrors = this.tripsService.AddTrip(model, this.User.Id);
            if (modelErrors.Count > 0)
            {
                return this.Error(modelErrors);
            }

            return this.Redirect("/Trips/All");
        }

        [Authorize]
        public HttpResponse Details(string tripId)
        {
            var model = this.tripsService.GetTripById(tripId);

            return this.View(model);
        }

        [Authorize]
        public HttpResponse AddUserToTrip(string tripId)
        {
            if(!this.tripsService.AddUserToTrip(tripId, this.User.Id))
            {
                return this.Error("You can't join this trip");
            }
            return this.Redirect("/Trips/All");
        }
    }
}
