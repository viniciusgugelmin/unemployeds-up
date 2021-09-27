using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
  public class SubjectDAO
  {
    private readonly DataContext _dataContext;

    public SubjectDAO(DataContext dataContext) 
            => _dataContext = dataContext;

    public List<Subject> List() => _dataContext.Subjects.ToList();

    public Subject FindById(int id) 
    {
        return _dataContext.Subjects.Find(id);
    }

    public Subject FindWithCourse(int id) 
    {
        Subject subject = _dataContext.Subjects.Find(id);
        _dataContext.Subjects.Include(s => s.Course).Load();

        return subject;
    }

    public bool SubjectExists(int? id)
    {
        return _dataContext.Subjects.Any(c => c.Id == id);
    }

    public void Create(Subject subject)
    {
        _dataContext.Subjects.Add(subject);
        _dataContext.SaveChanges();
    }

    public void Update(Subject subject)
    {
        _dataContext.Update(subject);
        _dataContext.SaveChanges();
    }

    public void Delete(int id)
    {
      _dataContext.Subjects.Remove(FindById(id));
      _dataContext.SaveChanges();
    }
  }
}
