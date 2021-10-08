using System;

namespace Back.Models
{
    public class VacancySkill
    {
        /// Properties

        public int Id { get; set; }
        public int VacancyId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public VacancySkill() => CreatedAt = DateTime.Now;


        /// Relations

        public Vacancy Vacancy { get; set; }
    }
}