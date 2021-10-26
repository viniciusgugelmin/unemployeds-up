using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/vacancy-skill")]
    public class VacancySkillController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly VacancySkillDAO _vacancySkillDAO;
        private readonly VacancyDAO _vacancyDAO;

        public VacancySkillController(
            DataContext dataContext,
            VacancySkillDAO vacancySkillDAO,
            VacancyDAO vacancyDAO)
        {
            _dataContext = dataContext;
            _vacancySkillDAO = vacancySkillDAO;
            _vacancyDAO = vacancyDAO;
        }

        // PUT
        // /api/vacancy-skill
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] VacancySkill vacancySkill)
        {
            Boolean vacancySkillExists = _vacancySkillDAO.VacancySkillExists(vacancySkill.Id);

            if (!vacancySkillExists) return NotFound();

            Boolean vacancyExists = _vacancySkillDAO.VacancySkillExists(vacancySkill.VacancyId);

            if (!vacancyExists) return ValidationProblem("Vacancy doesn't exist");

            if (vacancySkill.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            _vacancySkillDAO.Update(vacancySkill);

            return Ok(vacancySkill);
        }

        // POST
        // /api/vacancy-skill
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] VacancySkill vacancySkill)
        {
            Boolean vacancyExists = _vacancySkillDAO.VacancySkillExists(vacancySkill.VacancyId);

            if (!vacancyExists) return ValidationProblem("Vacancy doesn't exist");

            if (vacancySkill.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            _vacancySkillDAO.Create(vacancySkill);
    
            return Created("", vacancySkill);
        }

        // DELETE
        // /api/vacancy-skill/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean vacancySkillExists = _vacancySkillDAO.VacancySkillExists(id);

            if (!vacancySkillExists) return NotFound();

            Int32 vacancyId = _vacancySkillDAO.FindById(id).VacancyId;

            _vacancySkillDAO.Delete(id);

            Vacancy vacancy = _vacancyDAO.FindWithRelations(vacancyId);

            return Ok(vacancy.VacancySkills);
        }
    }
}