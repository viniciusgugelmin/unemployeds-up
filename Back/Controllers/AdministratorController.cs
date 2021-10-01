using System;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/administrator")]
    public class AdministratorController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly AdministratorDAO _administratorDAO;

        public AdministratorController(
            DataContext dataContext, 
            AdministratorDAO administratorDAO) 
        {
            _dataContext = dataContext;
            _administratorDAO = administratorDAO;
        } 
        
        // GET
        // /api/administrator
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_administratorDAO.List());

        // GET
        // /api/administrator/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Administrator administrator = _administratorDAO.FindById(id);

            if (administrator == null) return NotFound();
            
            return Ok(administrator);
        }

        // PUT
        // /api/administrator
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Administrator administrator)
        {
            if (administrator.Name == null) {
                return ValidationProblem("Name is required");
            }

            if (administrator.Email == null) {
                return ValidationProblem("Email is required");
            }

            if (administrator.Password == null) {
                return ValidationProblem("Password is required");
            }

            Boolean administratorEmailExists = _administratorDAO.AdministratorEmailExists(administrator.Email, administrator.Id);

             if (administratorEmailExists == true) {
                return ValidationProblem("Email already registered");
            }

            _administratorDAO.Update(administrator);

            return Ok(administrator); 
        }

        // POST
        // /api/administrator
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Administrator administrator) 
        {
            if (administrator.Name == null) {
                return ValidationProblem("Name is required");
            }

            if (administrator.Email == null) {
                return ValidationProblem("Email is required");
            }

            if (administrator.Password == null) {
                return ValidationProblem("Password is required");
            }

            Boolean administratorEmailExists = _administratorDAO.AdministratorEmailExists(administrator.Email);

            if (administratorEmailExists == true) {
                return ValidationProblem("Email already registered");
            }
            
            _administratorDAO.Create(administrator);

            return Created("", administrator);
        }

        // DELETE
        // /api/administrator/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean administratorExists = _administratorDAO.AdministratorExists(id);

            if (!administratorExists) return NotFound();

           _administratorDAO.Delete(id);

            return Ok(_administratorDAO.List());
        }
    }
}