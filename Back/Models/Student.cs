using System;
using System.Collections.Generic;

namespace Back.Models
{
    public class Student
    {
        /// Properties

        public int Id { get; set; }
        public int CourseId { get; set; }
        public string Name { get; set; }
        public Boolean Gender { get; set; }
        public char GenderName { get; set; }
        public string Birthdate { get; set; }
        public string ZipCode { get; set; }
        public string Number { get; set; }
        public string Complement { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public Student()
        {
            CreatedAt = DateTime.Now;
        }

        /// Relations

        public Course Course { get; set; }

        public ICollection<StudentSkill> StudentSkills { get; set; }

        public ICollection<StudentVacancy> StudentVacancies { get; set; }
    }
}