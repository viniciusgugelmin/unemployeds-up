using System;
using System.Collections.Generic;

namespace Back.Models
{
    public class Course
    {
        /// Properties
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public Course() => CreatedAt = DateTime.Now;

        /// Relations

        public ICollection<Subject> Subject { get; set; }
    }
}