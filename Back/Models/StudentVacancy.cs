using System;

namespace Back.Models
{
    public class StudentVacancy
    {
        /// Properties

        public int Id { get; set; }
        public int StudentId { get; set; }
        public int VacancyId { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public StudentVacancy() => CreatedAt = DateTime.Now;

        /// Relations

        public Student Student { get; set; }
        public Vacancy Vacancy { get; set; }
    }
}