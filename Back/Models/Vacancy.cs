using System;
using System.Collections.Generic;

namespace Back.Models
{
    public class Vacancy
    {
        /// Properties

        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public Vacancy() => CreatedAt = DateTime.Now;

        /// Relations

        public Company Company { get; set; }

        public ICollection<VacancySkill> VacancySkills { get; set; }

        public ICollection<StudentVacancy> StudentVacancies { get; set; }
    }
}