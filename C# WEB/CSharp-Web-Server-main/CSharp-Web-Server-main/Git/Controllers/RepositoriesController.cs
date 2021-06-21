using Git.Models.Repositories;
using Git.Services;
using MyWebServer.Controllers;
using MyWebServer.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Git.Controllers
{
    public class RepositoriesController : Controller
    {
        private readonly IRepositoriesService repositoriesService;

        public RepositoriesController(
            IRepositoriesService repositoriesService)
        {
            this.repositoriesService = repositoriesService;
        }

        public HttpResponse All()
        {
            var repositories = repositoriesService.GetAllPublicRepositories();
            return this.View(repositories);
        }

        [Authorize]
        public HttpResponse Create()
        {
            return this.View();
        }

        [Authorize]
        [HttpPost]
        public HttpResponse Create(RepositoryCreateFormModel model)
        {
            string id = string.Empty;
            (var information, var isCorrect)  = repositoriesService.CreateRepository(model, User.Id);

            if (!isCorrect)
            {
                return this.Error(information);
            }

            id = information.FirstOrDefault();

            return Redirect("/Repositories/All");
        }
    }
}
