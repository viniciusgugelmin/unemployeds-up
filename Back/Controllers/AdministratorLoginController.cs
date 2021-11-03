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
            if (administrator.Email == "" && administrator.Password == "")
            {
                return ValidationProblem("Fill the fields");
            }

            if (administrator.Email == "")
            {
                return ValidationProblem("Email is required");
            }

            if (administrator.Password == "")
            {
                return ValidationProblem("Password is required");
            }

            Administrator administratorToLogin = _administratorDAO.Login(administrator.Email, administrator.Password);

            if (administratorToLogin == null) return NotFound();

            return Ok(administratorToLogin);
        }
    }
}