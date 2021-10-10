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

        public DbSet<Company> Company { get; set; }

        public DbSet<Vacancy> Vacancy { get; set; }

        public DbSet<VacancySkill> VacancySkill { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<SubjectSkill> SubjectSkill { get; set; }

        public DbSet<Student> Student { get; set; }

        public DbSet<StudentSkill> StudentSkill { get; set; }

        public DbSet<StudentVacancy> StudentVacancy { get; set; }
        

        /// Relations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Vacancy x Company
            modelBuilder.Entity<Vacancy>()
            .HasOne(v => v.Company)
            .WithMany(c => c.Vacancies)
            .HasForeignKey(v => v.CompanyId)
            .IsRequired();
            // 
            modelBuilder.Entity<Company>()
            .HasMany(c => c.Vacancies)
            .WithOne(v => v.Company)
            .OnDelete(DeleteBehavior.Cascade);

            // VacancySkill x Vacancy
            modelBuilder.Entity<VacancySkill>()
            .HasOne(vc => vc.Vacancy)
            .WithMany(v => v.VacancySkills)
            .HasForeignKey(vc => vc.VacancyId)
            .IsRequired();
            //
            modelBuilder.Entity<Vacancy>()
            .HasMany(v => v.VacancySkills)
            .WithOne(vc => vc.Vacancy)
            .OnDelete(DeleteBehavior.Cascade);

            // Subject x Course
            modelBuilder.Entity<Subject>()
            .HasOne(s => s.Course)
            .WithMany(c => c.Subjects)
            .HasForeignKey(s => s.CourseId)
            .IsRequired();
            // 
            modelBuilder.Entity<Course>()
            .HasMany(c => c.Subjects)
            .WithOne(s => s.Course)
            .OnDelete(DeleteBehavior.Cascade);

            // SubjectSkill x Subject
            modelBuilder.Entity<SubjectSkill>()
            .HasOne(ss => ss.Subject)
            .WithMany(s => s.SubjectSkills)
            .HasForeignKey(ss => ss.SubjectId)
            .IsRequired();
            //
            modelBuilder.Entity<Subject>()
            .HasMany(s => s.SubjectSkills)
            .WithOne(ss => ss.Subject)
            .OnDelete(DeleteBehavior.Cascade);

            // StudentSkill x Student
            modelBuilder.Entity<StudentSkill>()
            .HasOne(ss => ss.Student)
            .WithMany(s => s.StudentSkills)
            .HasForeignKey(ss => ss.StudentId)
            .IsRequired();
            //
            modelBuilder.Entity<Student>()
            .HasMany(s => s.StudentSkills)
            .WithOne(ss => ss.Student)
            .OnDelete(DeleteBehavior.Cascade);

            // StudentVacancy x Student
            modelBuilder.Entity<StudentVacancy>()
            .HasOne(sv => sv.Student)
            .WithMany(s => s.StudentVacancies)
            .HasForeignKey(sv => sv.StudentId)
            .IsRequired();
            //
            modelBuilder.Entity<Student>()
            .HasMany(s => s.StudentVacancies)
            .WithOne(sv => sv.Student)
            .OnDelete(DeleteBehavior.Cascade);

            // StudentVacancy x Vacancy
            modelBuilder.Entity<StudentVacancy>()
            .HasOne(sv => sv.Vacancy)
            .WithMany(v => v.StudentVacancies)
            .HasForeignKey(sv => sv.VacancyId)
            .IsRequired();
            //
            modelBuilder.Entity<Vacancy>()
            .HasMany(v => v.StudentVacancies)
            .WithOne(sv => sv.Vacancy)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
