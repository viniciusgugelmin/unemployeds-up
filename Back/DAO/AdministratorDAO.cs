using Back.Models;
using System.Collections.Generic;
using System.Linq;
using Back.Data;

namespace Back.DAO
{
    public class AdministratorDAO
    {
        private readonly DataContext _dataContext;

        public AdministratorDAO(DataContext dataContext)
                => _dataContext = dataContext;

        public List<Administrator> List() => _dataContext.Administrators.ToList();

        public Administrator FindById(int id) => _dataContext.Administrators.Find(id);

        public Administrator FindByEmail(string email) => _dataContext.Administrators.Where(a => a.Email.Equals(email)).FirstOrDefault();

        public Administrator Login(string email, string password)
        {
            Administrator administrator = _dataContext.Administrators.Where(a => a.Email.Equals(email) && a.Password.Equals(password)).FirstOrDefault();

            return administrator;
        }

        public bool AdministratorExists(int? id)
        {
            return _dataContext.Administrators.Any(a => a.Id == id);
        }

        public bool AdministratorEmailExists(string email, int id = 0)
        {
            return _dataContext.Administrators.Any(a => a.Email == email && (id == 0 || a.Id != id));
        }

        public void Create(Administrator administrator)
        {
            _dataContext.Administrators.Add(administrator);
            _dataContext.SaveChanges();
        }

        public void Update(Administrator administrator)
        {
            _dataContext.Update(administrator);
            _dataContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _dataContext.Administrators.Remove(FindById(id));
            _dataContext.SaveChanges();
        }
    }
}
