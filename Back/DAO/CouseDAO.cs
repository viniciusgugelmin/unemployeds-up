using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class CourseDAO
    {
        private readonly DataContext _dataContext;

        public CourseDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<Course> List() => _dataContext.Courses.ToList();

        public Course FindById(int id)
        {
            return _dataContext.Courses.Find(id);
        }

        public Course FindWithRelations(int id)
        {
            return _dataContext.Courses
               .Include(c => c.Subjects)
               .FirstOrDefault(c => c.Id == id);
        }

        public bool CourseExists(int? id)
        {
            return _dataContext.Courses.Any(c => c.Id == id);
        }

        public void Create(Course course)
        {
            _dataContext.Courses.Add(course);
            _dataContext.SaveChanges();
        }

        public void Update(Course course)
        {
            _dataContext.Update(course);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.Courses.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
