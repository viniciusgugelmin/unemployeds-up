using System;
using System.Text.RegularExpressions;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/student-vacancy")]
    public class StudentVacancyController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly StudentVacancyDAO _studentVacancyDAO;
        private readonly StudentDAO _studentDAO;
        private readonly VacancyDAO _vacancyDAO;

        public StudentVacancyController(
            DataContext dataContext,
            StudentDAO studentDAO,
            StudentVacancyDAO studentVacancyDAO,
            VacancyDAO vacancyDAO)
        {
            _dataContext = dataContext;
            _studentDAO = studentDAO;
            _vacancyDAO = vacancyDAO;
            _studentVacancyDAO = studentVacancyDAO;
        }

        // PUT
        // /api/student-vacancy
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] StudentVacancy studentVacancy)
        {
            Boolean studentVacancyExists = _studentVacancyDAO.StudentVacancyExists(studentVacancy.Id);

            if (!studentVacancyExists) return NotFound();

            Boolean vacancyExists = _vacancyDAO.VacancyExists(studentVacancy.VacancyId);

            if (!vacancyExists) return ValidationProblem("Vacancy doesn't exist");

            Boolean studentExists = _studentDAO.StudentExists(studentVacancy.StudentId);

            if (!studentExists) return ValidationProblem("Student doesn't exist");

            _studentVacancyDAO.Update(studentVacancy);

            return Ok(studentVacancy);
        }

        // POST
        // /api/student-vacancy
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] StudentVacancy studentVacancy)
        {
            Boolean vacancyExists = _vacancyDAO.VacancyExists(studentVacancy.VacancyId);

            if (!vacancyExists) return ValidationProblem("Vacancy doesn't exist");

            Boolean studentExists = _studentDAO.StudentExists(studentVacancy.StudentId);

            if (!studentExists) return ValidationProblem("Student doesn't exist");

            studentVacancy.Student = _studentDAO.FindById(studentVacancy.StudentId);
            studentVacancy.Vacancy = _vacancyDAO.FindById(studentVacancy.VacancyId);
            _studentVacancyDAO.Create(studentVacancy);

            return Created("", studentVacancy);
        }

        // DELETE
        // /api/student-vacancy/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean studentVacancyExists = _studentVacancyDAO.StudentVacancyExists(id);

            if (!studentVacancyExists) return NotFound();

            Int32 studentId = _studentVacancyDAO.FindById(id).StudentId;

            _studentVacancyDAO.Delete(id);

            Student student = _studentDAO.FindWithRelations(studentId);

            return Ok(student.StudentVacancies);
        }
    }
}