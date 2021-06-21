using Git.Data;
using Git.Data.Models;
using Git.Models.Commits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Git.Services
{
    public class CommitsService : ICommitsService
    {
        private readonly GitDbContext dbContext;

        public CommitsService(GitDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public ICollection<string> AddCommit(CommitCreateFormModel model, string userId)
        {
            var errors = new List<string>();
            if (model.Description.Length < 5)
            {
                errors.Add("Desciprtion should be with more than 5 symbols");
                return errors;
            }

            var commit = new Commit
            {
                Description = model.Description,
                RepositoryId = model.Id,
                CreatorId = userId,
                CreatedOn = DateTime.UtcNow,
            };

            this.dbContext.Commits.Add(commit);
            this.dbContext.SaveChanges();

            return errors;
        }

        public ICollection<string> DeleteCommitById(string commitId, string userId)
        {
            var errors = new List<string>();

            var commit = this.dbContext.Commits.FirstOrDefault(x => x.Id == commitId);

            if (commit == null)
            {
                errors.Add("There is no commit with that id");
                return errors;
            }

            if (userId != commit.CreatorId)
            {
                errors.Add("You are not authorized to delete this commit");
                return errors;
            }

            this.dbContext.Commits.Remove(commit);
            this.dbContext.SaveChanges();

            return errors;
        }

        public ICollection<CommitsListViewModel> GetAllCommits(string userId)
        {
            var commits = this.dbContext.Commits
                .Where(x => x.CreatorId == userId)
                .Select(x => new CommitsListViewModel
                {
                    Id = x.Id,
                    RepositoryName = x.Repository.Name,
                    Description = x.Description,
                    CreatedOn = x.CreatedOn.ToString("yyyy/MM/dd/HH/mm")
                })
                .ToList();

            return commits;
        }

        public CommitsCreateViewModel GetCommitCreateViewModelById(string id)
        {
            return this.dbContext.Repositories.Where(x => x.Id == id)
                .Select(x => new CommitsCreateViewModel
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .FirstOrDefault();
        }
    }
}
