using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Git.Models.Repositories
{
    public class RepositoryListViewModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool IsPublic { get; set; }

        public string CreatedOn { get; set; }

        public string OwnerUsername { get; set; }

        public int CommitsCount { get; set; }
    }
}
