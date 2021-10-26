using System;
using System.Collections.Generic;
using System.Linq;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/vacancy")]
    public class VacancyController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly VacancyDAO _vacancyDAO;
        private readonly CompanyDAO _companyDAO;

        public VacancyController(
            DataContext dataContext,
            VacancyDAO vacancyDAO,
            CompanyDAO companyDAO)
        {
            _dataContext = dataContext;
            _vacancyDAO = vacancyDAO;
            _companyDAO = companyDAO;
        }

        // GET
        // /api/vacancy
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_vacancyDAO.List());

        // GET
        // /api/vacancy/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Vacancy vacancy = _vacancyDAO.FindWithRelations(id);

            if (vacancy == null) return NotFound();

            return Ok(vacancy);
        }

        // GET
        // /api/vacancy/{id}/vacancy-skills
        [HttpGet]
        [Route("{id}/vacancy-skills")]
        public IActionResult GetVacancySkills([FromRoute] Int32 id)
        {
            Vacancy vacancy = _vacancyDAO.FindWithRelations(id);

            if (vacancy == null) return NotFound();

            return Ok(vacancy.VacancySkills);
        }

        // GET
        // /api/vacancy/{id}/student-vacancies
        [HttpGet]
        [Route("{id}/student-vacancies")]
        public IActionResult GetStudentVacancies([FromRoute] Int32 id)
        {
            Vacancy vacancy = _vacancyDAO.FindWithRelations(id);

            if (vacancy == null) return NotFound();

            return Ok(vacancy.StudentVacancies);
        }

        // PUT
        // /api/vacancy/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Vacancy vacancy)
        {
            Boolean vacancyExists = _vacancyDAO.VacancyExists(vacancy.Id);

            if (!vacancyExists) return NotFound();

            Boolean companyExists = _companyDAO.CompanyExists(vacancy.CompanyId);

            if (!companyExists) return ValidationProblem("Company doesn't exist");

            if (vacancy.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (vacancy.Description == null)
            {
                return ValidationProblem("Description is required");
            }

            _vacancyDAO.Update(vacancy);

            return Ok(vacancy);
        }

        // POST
        // /api/vacancy
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Vacancy vacancy)
        {
            Boolean companyExists = _companyDAO.CompanyExists(vacancy.CompanyId);

            if (!companyExists) return ValidationProblem("Company doesn't exist");

            if (vacancy.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (vacancy.Description == null)
            {
                return ValidationProblem("Description is required");
            }

            vacancy.Company = _companyDAO.FindById(vacancy.CompanyId);
            _vacancyDAO.Create(vacancy);

            return Created("", vacancy);
        }

        // DELETE
        // /api/vacancy/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean vacancyExists = _vacancyDAO.VacancyExists(id);

            if (!vacancyExists) return NotFound();

            _vacancyDAO.Delete(id);

            return Ok(_vacancyDAO.List());
        }
    }
}