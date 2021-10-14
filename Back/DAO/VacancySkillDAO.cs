using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class VacancySkillDAO
    {
        private readonly DataContext _dataContext;

        public VacancySkillDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<VacancySkill> List() => _dataContext.VacancySkills.ToList();

        public VacancySkill FindById(int id)
        {
            return _dataContext.VacancySkills.Find(id);
        }

        public VacancySkill FindWithRelations(int id)
        {
            return _dataContext.VacancySkills
                    .Include(v => v.Vacancy)
                    .FirstOrDefault(v => v.Id == id);
        }

        public bool VacancySkillExists(int? id)
        {
            return _dataContext.VacancySkills.Any(c => c.Id == id);
        }

        public void Create(VacancySkill vacancySkill)
        {
            _dataContext.VacancySkills.Add(vacancySkill);
            _dataContext.SaveChanges();
        }

        public void Update(VacancySkill vacancySkill)
        {
            _dataContext.Update(vacancySkill);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.VacancySkills.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
