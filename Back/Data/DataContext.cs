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

        /// Tables

        public DbSet<Administrator> Administrators { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        /// Relations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subject>()
            .HasOne(s => s.Course)
            .WithMany(c => c.Subjects)
            .HasForeignKey(s => s.CourseId)
            .IsRequired();

            modelBuilder.Entity<Course>()
            .HasMany(c => c.Subjects)
            .WithOne(s => s.Course)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
