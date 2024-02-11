using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserLike>()
            .HasKey(item => new { item.SourceUserId, item.TargetUserId });

            modelBuilder.Entity<UserLike>()
            .HasOne(item => item.SourceUser)
            .WithMany(item => item.LikedUsers)
            .HasForeignKey(item => item.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserLike>()
            .HasOne(item => item.TargetUser)
            .WithMany(item => item.LikedByUsers)
            .HasForeignKey(item => item.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<UserLike> Likes { get; set; }
    }
}