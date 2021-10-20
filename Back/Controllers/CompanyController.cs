using System;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/company")]
    public class CompanyController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly CompanyDAO _companyDAO;

        public CompanyController(
            DataContext dataContext,
            CompanyDAO companyDAO)
        {
            _dataContext = dataContext;
            _companyDAO = companyDAO;
        }

        // GET
        // /api/company
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_companyDAO.List());

        // GET
        // /api/company/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Company company = _companyDAO.FindWithRelations(id);

            if (company == null) return NotFound();

            return Ok(company);
        }

        // GET
        // /api/company/{id}/vacancies
        [HttpGet]
        [Route("{id}/vacancies")]
        public IActionResult GetVacancies([FromRoute] Int32 id)
        {
            Company company = _companyDAO.FindWithRelations(id);

            if (company == null) return NotFound();

            return Ok(company.Vacancies);
        }

        // PUT
        // /api/company/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Company company)
        {
            Boolean companyExists = _companyDAO.CompanyExists(company.Id);

            if (!companyExists) return NotFound();

            if (company.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (company.Description == null)
            {
                return ValidationProblem("Description is required");
            }

            _companyDAO.Update(company);

            return Ok(company);
        }

        // POST
        // /api/company
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Company company)
        {
            if (company.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (company.Description == null)
            {
                return ValidationProblem("Description is required");
            }

            _companyDAO.Create(company);

            return Created("", company);
        }

        // DELETE
        // /api/company/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean companyExists = _companyDAO.CompanyExists(id);

            if (!companyExists) return NotFound();

            _companyDAO.Delete(id);

            return Ok(_companyDAO.List());
        }
    }
}