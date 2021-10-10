using System;
using System.Collections.Generic;

namespace Back.Models
{
    public class Company
    {
        /// Properties

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public Company() => CreatedAt = DateTime.Now;

        /// Relations

        public ICollection<Vacancy> Vacancies { get; set; }
    }
}