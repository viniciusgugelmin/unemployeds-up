using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class StudentSkillDAO
    {
        private readonly DataContext _dataContext;

        public StudentSkillDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<StudentSkill> List() => _dataContext.StudentSkills.ToList();

        public StudentSkill FindById(int id)
        {
            return _dataContext.StudentSkills.Find(id);
        }

        public StudentSkill FindWithRelations(int id)
        {
            return _dataContext.StudentSkills
                    .Include(s => s.Student)
                    .FirstOrDefault(s => s.Id == id);
        }

        public bool StudentSkillExists(int? id)
        {
            return _dataContext.StudentSkills.Any(c => c.Id == id);
        }

        public void Create(StudentSkill studentSkill)
        {
            _dataContext.StudentSkills.Add(studentSkill);
            _dataContext.SaveChanges();
        }

        public void Update(StudentSkill studentSkill)
        {
            _dataContext.Update(studentSkill);
            _dataContext.SaveChanges();
        }

        public void DeleteByStudent(int studentId, string name)
        {
            List<StudentSkill> studentSkills = _dataContext.StudentSkills.Where(skill => skill.StudentId == studentId).Where(skill => skill.Name == name).ToList();

            foreach (StudentSkill studentSkill in studentSkills)
            {
                _dataContext.StudentSkills.Remove(studentSkill);
            }

            _dataContext.SaveChanges();
        }
        public void Delete(int id)
        {
            _dataContext.StudentSkills.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
