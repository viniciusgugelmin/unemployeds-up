using System;
using System.Text.RegularExpressions;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/student-skill")]
    public class StudentSkillController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly StudentSkillDAO _studentSkillDAO;
        private readonly StudentDAO _studentDAO;

        public StudentSkillController(
            DataContext dataContext,
            StudentDAO studentDAO,
            StudentSkillDAO studentSkillDAO)
        {
            _dataContext = dataContext;
            _studentDAO = studentDAO;
            _studentSkillDAO = studentSkillDAO;
        }

        // PUT
        // /api/student-skill
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] StudentSkill studentSkill)
        {
            Boolean studentSkillExists = _studentSkillDAO.StudentSkillExists(studentSkill.Id);

            if (!studentSkillExists) return NotFound();

            Boolean studentExists = _studentDAO.StudentExists(studentSkill.StudentId);

            if (!studentExists) return ValidationProblem("Student doesn't exist");

            if (studentSkill.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            _studentSkillDAO.Update(studentSkill);

            return Ok(studentSkill);
        }

        // POST
        // /api/student-skill
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] StudentSkill studentSkill)
        {
            Boolean studentExists = _studentDAO.StudentExists(studentSkill.StudentId);

            if (!studentExists) return ValidationProblem("Student doesn't exist");

            if (studentSkill.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            studentSkill.Student = _studentDAO.FindById(studentSkill.StudentId);
            _studentSkillDAO.Create(studentSkill);

            return Created("", studentSkill);
        }

        // DELETE
        // /api/student-skill/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean studentSkillExists = _studentSkillDAO.StudentSkillExists(id);

            if (!studentSkillExists) return NotFound();

            Int32 studentId = _studentSkillDAO.FindById(id).StudentId;

            _studentSkillDAO.Delete(id);

            Student student = _studentDAO.FindWithRelations(studentId);

            return Ok(student.StudentSkills);
        }
    }
}