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
    [Route("api/subject")]
    public class SubjectController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly SubjectDAO _subjectDAO;
        private readonly CourseDAO _courseDAO;

        public SubjectController(
            DataContext dataContext,
            SubjectDAO subjectDAO,
            CourseDAO courseDAO)
        {
            _dataContext = dataContext;
            _subjectDAO = subjectDAO;
            _courseDAO = courseDAO;
        }

        // GET
        // /api/subject
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_subjectDAO.List());

        // GET
        // /api/subject/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Subject subject = _subjectDAO.FindWithRelations(id);

            if (subject == null) return NotFound();

            return Ok(subject);
        }

        // GET
        // /api/subject/{id}/subject-skills
        [HttpGet]
        [Route("{id}/subject-skills")]
        public IActionResult GetSubjectSkills([FromRoute] Int32 id)
        {
            Subject subject = _subjectDAO.FindWithRelations(id);

            if (subject == null) return NotFound();

            return Ok(subject.SubjectSkills);
        }

        // PUT
        // /api/subject/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Subject subject)
        {
            Boolean subjectExists = _subjectDAO.SubjectExists(subject.Id);

            if (!subjectExists) return NotFound();

            Boolean courseExists = _courseDAO.CourseExists(subject.CourseId);

            if (!courseExists) return ValidationProblem("Course doesn't exist");

            if (subject.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (subject.Description == null)
            {
                return ValidationProblem("Description is required");
            }

            _subjectDAO.Update(subject);

            return Ok(subject);
        }

        // POST
        // /api/subject
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Subject subject)
        {
            Boolean courseExists = _courseDAO.CourseExists(subject.CourseId);

            if (!courseExists) return ValidationProblem("Course doesn't exist");

            if (subject.Name == null)
            {
                return ValidationProblem("Name is required");
            }

            if (subject.Description == null)
            {
                return ValidationProblem("Description is required");
            }

            subject.Course = _courseDAO.FindById(subject.CourseId);
            _subjectDAO.Create(subject);

            return Created("", subject);
        }

        // DELETE
        // /api/subject/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean subjectExists = _subjectDAO.SubjectExists(id);

            if (!subjectExists) return NotFound();

            _subjectDAO.Delete(id);

            return Ok(_subjectDAO.List());
        }
    }
}