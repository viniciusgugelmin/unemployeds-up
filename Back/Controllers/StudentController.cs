using System;
using System.Text.RegularExpressions;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly StudentDAO _studentDAO;
        private readonly CourseDAO _courseDAO;

        public StudentController(
            DataContext dataContext,
            StudentDAO studentDAO,
            CourseDAO courseDAO)
        {
            _dataContext = dataContext;
            _studentDAO = studentDAO;
            _courseDAO = courseDAO;
        }

        // GET
        // /api/student
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_studentDAO.List());

        // GET
        // /api/student/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Student student = _studentDAO.FindWithRelations(id);

            if (student == null) return NotFound();

            return Ok(student);
        }

        // GET
        // /api/student/{id}/student-skills
        [HttpGet]
        [Route("{id}/student-skills")]
        public IActionResult GetStudentSkills([FromRoute] Int32 id)
        {
            Student student = _studentDAO.FindWithRelations(id);

            if (student == null) return NotFound();

            return Ok(student.StudentSkills);
        }

        // GET
        // /api/student/{id}/student-vacancies
        [HttpGet]
        [Route("{id}/student-vacancies")]
        public IActionResult GetStudentVacancies([FromRoute] Int32 id)
        {
            Student student = _studentDAO.FindWithRelations(id);

            if (student == null) return NotFound();

            return Ok(student.StudentVacancies);
        }

        // PUT
        // /api/student/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Student student)
        {
            Boolean studentExists = _studentDAO.StudentExists(student.Id);

            if (!studentExists) return NotFound();

            Boolean courseExists = _courseDAO.CourseExists(student.CourseId);

            if (!courseExists) return ValidationProblem("Course doesn't exist");

            if (student.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (student.Birthdate == null)
            {
                return ValidationProblem("Birthdate is required");
            }

            if (student.ZipCode == null)
            {
                return ValidationProblem("ZipCode is required");
            }

            if (student.Number == null)
            {
                return ValidationProblem("Number is required");
            }

            if (student.Password == null)
            {
                return ValidationProblem("Password is required");
            }

            student.GenderName = student.Gender ? 'M' : 'F';

            _studentDAO.Update(student);

            return Ok(student);
        }

        // POST
        // /api/student
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Student student)
        {
            Boolean courseExists = _courseDAO.CourseExists(student.CourseId);

            if (!courseExists) return ValidationProblem("Course doesn't exist");

            if (student.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (student.Birthdate == null)
            {
                return ValidationProblem("Birthdate is required");
            }

            if (student.ZipCode == null)
            {
                return ValidationProblem("ZipCode is required");
            }

            if (student.Number == null)
            {
                return ValidationProblem("Number is required");
            }

            if (student.Password == null)
            {
                return ValidationProblem("Password is required");
            }

            student.GenderName = student.Gender ? 'M' : 'F';

            student.Course = _courseDAO.FindById(student.CourseId);
            _studentDAO.Create(student);

            return Created("", student);
        }

        // DELETE
        // /api/student/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean studentExists = _studentDAO.StudentExists(id);

            if (!studentExists) return NotFound();

            _studentDAO.Delete(id);

            return Ok(_studentDAO.List());
        }
    }
}