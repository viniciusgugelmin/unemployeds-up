using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class VacancyDAO
    {
        private readonly DataContext _dataContext;

        public VacancyDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<Vacancy> List() => _dataContext.Vacancies.ToList();

        public Vacancy FindById(int id)
        {
            return _dataContext.Vacancies.Find(id);
        }

        public Vacancy FindWithRelations(int id)
        {
            return _dataContext.Vacancies
                    .Include(v => v.VacancySkills)
                    .Include(v => v.StudentVacancies)
                    .Include(v => v.Company)
                    .FirstOrDefault(v => v.Id == id);
        }

        public bool VacancyExists(int? id)
        {
            return _dataContext.Vacancies.Any(c => c.Id == id);
        }

        public void Create(Vacancy vacancy)
        {
            _dataContext.Vacancies.Add(vacancy);
            _dataContext.SaveChanges();
        }

        public void Update(Vacancy vacancy)
        {
            _dataContext.Update(vacancy);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.Vacancies.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
