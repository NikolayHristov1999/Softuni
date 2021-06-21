namespace Git.Services
{
    using Git.Models.Repositories;
    using System.Collections.Generic;

    public interface IRepositoriesService
    {
        public (ICollection<string>, bool) CreateRepository(RepositoryCreateFormModel model, string userId);

        ICollection<RepositoryListViewModel> GetAllPublicRepositories();
    }
}
