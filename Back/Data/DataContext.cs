using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back.Data
{
    public class DataContext : DbContext
    {
        /// Database options
        public DataContext(DbContextOptions<DataContext> options) :
            base(options)
        {
        }

        /// Relations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
            .HasMany(c => c.Subject)
            .WithOne(s => s.Course);
        }

        /// Tables

        public DbSet<Administrator> Administrators { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Subject> Subjects { get; set; }
    }
}
