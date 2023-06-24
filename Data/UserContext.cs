using AngularNetVinyl.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularNetVinyl.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}