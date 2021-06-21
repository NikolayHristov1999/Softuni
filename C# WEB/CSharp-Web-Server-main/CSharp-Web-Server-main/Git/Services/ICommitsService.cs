using Git.Models.Commits;
using System.Collections.Generic;

namespace Git.Services
{
    public interface ICommitsService
    {
        CommitsCreateViewModel GetCommitCreateViewModelById(string id);

        ICollection<CommitsListViewModel> GetAllCommits(string userId);

        ICollection<string> AddCommit(CommitCreateFormModel model, string userId);
        ICollection<string> DeleteCommitById(string commitId, string userId);
    }
}