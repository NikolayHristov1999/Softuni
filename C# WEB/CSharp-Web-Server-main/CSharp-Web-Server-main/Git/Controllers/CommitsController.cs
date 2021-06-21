namespace Git.Controllers
{
    using Git.Models.Commits;
    using Git.Services;
    using MyWebServer.Controllers;
    using MyWebServer.Http;

    public class CommitsController : Controller
    {
        private readonly ICommitsService commitsService;

        public CommitsController(ICommitsService commitsService)
        {
            this.commitsService = commitsService;
        }

        [Authorize]
        public HttpResponse Create(string Id)
        {
            var commit = this.commitsService.GetCommitCreateViewModelById(Id);

            if(commit == null)
            {
                return this.BadRequest();
            }
            return this.View(commit);
        }

        [Authorize]
        [HttpPost]
        public HttpResponse Create(CommitCreateFormModel model)
        {
            var errors = this.commitsService.AddCommit(model, this.User.Id);

            if (errors.Count > 0)
            {
                return this.Error(errors);
            }

            return this.Redirect("/Repositories/All");
        }

        [Authorize]
        public HttpResponse All()
        {
            var commits = this.commitsService.GetAllCommits(this.User.Id);
            return this.View(commits);
        }

        [Authorize]
        public HttpResponse Delete(string id)
        {
            var errors = this.commitsService.DeleteCommitById(id, this.User.Id);

            if (errors.Count > 0)
            {
                return this.Error(errors);
            }

            return Redirect("/commits/all");
        }
    }
}
