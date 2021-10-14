using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class SubjectSkillDAO
    {
        private readonly DataContext _dataContext;

        public SubjectSkillDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<SubjectSkill> List() => _dataContext.SubjectSkills.ToList();

        public SubjectSkill FindById(int id)
        {
            return _dataContext.SubjectSkills.Find(id);
        }

        public SubjectSkill FindWithRelations(int id)
        {
            return _dataContext.SubjectSkills
                    .Include(s => s.Subject)
                    .FirstOrDefault(s => s.Id == id);
        }

        public bool SubjectSkillExists(int? id)
        {
            return _dataContext.SubjectSkills.Any(c => c.Id == id);
        }

        public void Create(SubjectSkill subjectSkill)
        {
            _dataContext.SubjectSkills.Add(subjectSkill);
            _dataContext.SaveChanges();
        }

        public void Update(SubjectSkill subjectSkill)
        {
            _dataContext.Update(subjectSkill);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.SubjectSkills.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
