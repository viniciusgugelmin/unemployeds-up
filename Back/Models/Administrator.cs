using System;
namespace Back.Models
{
    public class Administrator
    {
        /// Properties
        
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        /// Constructor

        public Administrator() => CreatedAt = DateTime.Now;
    }
}