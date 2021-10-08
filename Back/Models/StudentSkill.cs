using System;

namespace Back.Models
{
    public class StudentSkill
    {
        /// Properties

        public int Id { get; set; }
        public int StudentId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public StudentSkill() => CreatedAt = DateTime.Now;


        /// Relations

        public Student Student { get; set; }
    }
}