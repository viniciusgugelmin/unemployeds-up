using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class StudentDAO
    {
        private readonly DataContext _dataContext;

        public StudentDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<Student> List() => _dataContext.Students.ToList();

        public Student FindById(int id)
        {
            return _dataContext.Students.Find(id);
        }

        public Student FindWithRelations(int id)
        {
            return _dataContext.Students
                    .Include(s => s.Course)
                    .Include(s => s.StudentSkills)
                    .Include(s => s.StudentVacancies)
                    .FirstOrDefault(s => s.Id == id);
        }

        public bool StudentExists(int? id)
        {
            return _dataContext.Students.Any(c => c.Id == id);
        }

        public void Create(Student student)
        {
            _dataContext.Students.Add(student);
            _dataContext.SaveChanges();
        }

        public void Update(Student student)
        {
            _dataContext.Update(student);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.Students.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
