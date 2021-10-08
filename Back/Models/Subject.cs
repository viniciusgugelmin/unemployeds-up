using System;
using System.Collections.Generic;

namespace Back.Models
{
    public class Subject
    {
        /// Properties

        public int Id { get; set; }
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public Subject() => CreatedAt = DateTime.Now;

        /// Relations

        public Course Course { get; set; }
        public ICollection<SubjectSkill> SubjectSkills { get; set; }
    }
}