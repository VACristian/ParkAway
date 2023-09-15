using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ParkAwayServer.Models
{
    public class ParkContext : IdentityDbContext
    {
        public ParkContext(DbContextOptions options) : base(options)
        {
           
        }
        public new DbSet<Users>  Users { get; set; }

        public DbSet<IndividualSpaces> IndividualSpaces { get; set; }

        public DbSet<ParkingSpaces> ParkingSpaces { get; set; }

        public DbSet<ParkingTichet> ParkingTichets { get; set; }


    }
}
