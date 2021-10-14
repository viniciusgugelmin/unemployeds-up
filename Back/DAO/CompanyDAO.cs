using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Microsoft.EntityFrameworkCore;

namespace Back.DAO
{
    public class CompanyDAO
    {
        private readonly DataContext _dataContext;

        public CompanyDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<Company> List() => _dataContext.Companies.ToList();

        public Company FindById(int id)
        {
            return _dataContext.Companies.Find(id);
        }

        public Company FindWithRelations(int id)
        {
            return _dataContext.Companies
                .Include(c => c.Vacancies)
                .FirstOrDefault(c => c.Id == id);
        }

        public bool CompanyExists(int? id)
        {
            return _dataContext.Companies.Any(c => c.Id == id);
        }

        public void Create(Company company)
        {
            _dataContext.Companies.Add(company);
            _dataContext.SaveChanges();
        }

        public void Update(Company company)
        {
            _dataContext.Update(company);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.Companies.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
