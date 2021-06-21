
namespace Git.Services
{
    using Git.Data;
    using Git.Data.Models;
    using Git.Models.Repositories;
    using System.Collections.Generic;
    using System.Linq;

    public class RepositoriesService : IRepositoriesService
    {
        private readonly GitDbContext dbContext;
        private readonly IValidator validator;

        public RepositoriesService(
            GitDbContext dbContext,
            IValidator validator)
        {
            this.dbContext = dbContext;
            this.validator = validator;
        }
        public (ICollection<string>, bool) CreateRepository(RepositoryCreateFormModel model, string userId)
        {
            var information = this.validator.ValidateRepository(model);
            if (information.Count > 0)
            {
                return (information, false);
            }

            if (dbContext.Repositories.Any(x => x.Name == model.Name))
            {
                information.Add("There is already a repository with that name");
                return (information, false);
            }

            var repository = new Repository
            {
                IsPublic = model.RepositoryType == "Public",
                Name = model.Name,
                CreatedOn = System.DateTime.UtcNow,
                OwnerId = userId,
            };

            dbContext.Repositories.Add(repository);
            dbContext.SaveChanges();

            information.Add(repository.Id);
            return (information, true);
        }

        public ICollection<RepositoryListViewModel> GetAllPublicRepositories()
        {
            var repositories = dbContext.Repositories
                .Where(x => x.IsPublic == true)
                .Select(x => new RepositoryListViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    CreatedOn = x.CreatedOn.ToString("yyyy/MM/dd/HH/mm"),
                    OwnerUsername = x.Owner.Username,
                    CommitsCount = x.Commits.Count,
                })
                .ToList();
                

            return repositories;
        }
    }
}
