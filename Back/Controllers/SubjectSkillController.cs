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
    [Route("api/subject-skill")]
    public class SubjectSkillController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly SubjectSkillDAO _subjectSkillDAO;
        private readonly StudentSkillDAO _studentSkillDAO;
        private readonly SubjectDAO _subjectDAO;
        private readonly StudentDAO _studentDAO;

        public SubjectSkillController(
            DataContext dataContext,
            SubjectDAO subjectDAO,
            SubjectSkillDAO subjectSkillDAO,
            StudentSkillDAO studentSkillDAO,
            StudentDAO studentDAO)
        {
            _dataContext = dataContext;
            _subjectDAO = subjectDAO;
            _subjectSkillDAO = subjectSkillDAO;
            _studentSkillDAO = studentSkillDAO;
            _studentDAO = studentDAO;
        }

        // PUT
        // /api/subject-skill
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] SubjectSkill subjectSkill)
        {
            Boolean subjectSkillExists = _subjectSkillDAO.SubjectSkillExists(subjectSkill.Id);

            if (!subjectSkillExists) return NotFound();

            Boolean subjectExists = _subjectDAO.SubjectExists(subjectSkill.SubjectId);

            if (!subjectExists) return ValidationProblem("Subject doesn't exist");

            if (subjectSkill.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            _subjectSkillDAO.Update(subjectSkill);

            return Ok(subjectSkill);
        }

        // POST
        // /api/subject-skill
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] SubjectSkill subjectSkill)
        {
            Boolean subjectExists = _subjectDAO.SubjectExists(subjectSkill.SubjectId);

            if (!subjectExists) return ValidationProblem("Subject doesn't exist");

            if (subjectSkill.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            subjectSkill.Subject = _subjectDAO.FindById(subjectSkill.SubjectId);
            _subjectSkillDAO.Create(subjectSkill);

            List<Student> studentsWithThisCourse = _studentDAO.ListByCourseId(subjectSkill.Subject.CourseId);

            foreach (Student student in studentsWithThisCourse)
            {
                StudentSkill studentSkill = new StudentSkill(subjectSkill, student.Id);
                studentSkill.Student = _studentDAO.FindById(student.Id);
                _studentSkillDAO.Create(studentSkill);
            }

            return Created("", subjectSkill);
        }


        // DELETE
        // /api/subject-skill/{id}/with-related
        [HttpDelete]
        [Route("{id}/with-related")]
        public IActionResult DeleteByIdWithRelated([FromRoute] Int32 id)
        {
            Boolean subjectSkillExists = _subjectSkillDAO.SubjectSkillExists(id);

            if (!subjectSkillExists) return NotFound();

            Int32 subjectId = _subjectSkillDAO.FindById(id).SubjectId;

            Subject subject = _subjectDAO.FindWithRelations(subjectId);

            List<Student> studentsWithThisCourse = _studentDAO.ListByCourseId(subject.CourseId);

            SubjectSkill subjectSkill = _subjectSkillDAO.FindById(id);

            foreach (Student student in studentsWithThisCourse)
            {
                _studentSkillDAO.DeleteByStudent(student.Id, subjectSkill.Name);
            }

            _subjectSkillDAO.Delete(id);

            return Ok(subject.SubjectSkills);
        }

        // DELETE
        // /api/subject-skill/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean subjectSkillExists = _subjectSkillDAO.SubjectSkillExists(id);

            if (!subjectSkillExists) return NotFound();

            Int32 subjectId = _subjectSkillDAO.FindById(id).SubjectId;

            _subjectSkillDAO.Delete(id);

            Subject subject = _subjectDAO.FindWithRelations(subjectId);

            return Ok(subject.SubjectSkills);
        }
    }
}