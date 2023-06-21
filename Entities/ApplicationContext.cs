using Microsoft.EntityFrameworkCore;

namespace AngularNetVinyl.Entities
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
