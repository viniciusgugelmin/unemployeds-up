using System;

namespace Back.Models
{
    public class SubjectSkill
    {
        /// Properties

        public int Id { get; set; }
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public SubjectSkill() => CreatedAt = DateTime.Now;


        /// Relations

        public Subject Subject { get; set; }
    }
}