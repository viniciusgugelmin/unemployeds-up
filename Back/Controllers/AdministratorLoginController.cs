using System;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/administrator/login")]
    public class AdministratorLoginController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly AdministratorDAO _administratorDAO;

        public AdministratorLoginController(
            DataContext dataContext,
            AdministratorDAO administratorDAO)
        {
            _dataContext = dataContext;
            _administratorDAO = administratorDAO;
        }

        // POST
        // /api/administrator/login
        [HttpPost]
        [Route("")]
        public IActionResult Login([FromBody] Administrator administrator)
        {
            Administrator administratorToLogin = _administratorDAO.Login(administrator.Email, administrator.Password);

            if (administratorToLogin == null) return NotFound();

            return Ok(administratorToLogin);
        }
    }
}