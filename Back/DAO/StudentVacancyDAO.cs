using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class StudentVacancyDAO
    {
        private readonly DataContext _dataContext;

        public StudentVacancyDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<StudentVacancy> List() => _dataContext.StudentVacancies.ToList();

        public StudentVacancy FindById(int id)
        {
            return _dataContext.StudentVacancies.Find(id);
        }

        public StudentVacancy FindWithRelations(int id)
        {
            return _dataContext.StudentVacancies
                    .Include(s => s.Student)
                    .Include(s => s.Vacancy)
                    .FirstOrDefault(s => s.Id == id);
        }

        public bool StudentVacancyExists(int? id)
        {
            return _dataContext.StudentVacancies.Any(c => c.Id == id);
        }

        public void Create(StudentVacancy studentVacancy)
        {
            _dataContext.StudentVacancies.Add(studentVacancy);
            _dataContext.SaveChanges();
        }

        public void Update(StudentVacancy studentVacancy)
        {
            _dataContext.Update(studentVacancy);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.StudentVacancies.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
