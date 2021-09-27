using System;
using System.Collections.Generic;
using System.Linq;
using Back.DAO;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/course")]
    public class CourseController : ControllerBase
    {
        private readonly DataContext _dataContext; 
        private readonly CourseDAO _courseDAO;

        public CourseController(
            DataContext dataContext,
            CourseDAO courseDAO) 
        {
            _dataContext = dataContext;
            _courseDAO = courseDAO;
        } 
        
        // GET
        // /api/course
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_courseDAO.List());

        // GET
        // /api/course/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Course course = _courseDAO.FindById(id);

            if (course == null) return NotFound();
            
            return Ok(course);
        }

        // GET
        // /api/course/{id}/subjects
        [HttpGet]
        [Route("{id}/subjects")]
        public IActionResult GetSubjects([FromRoute] Int32 id)
        {
            Course course = _courseDAO.FindById(id);

            if (course == null) return NotFound();
            
            return Ok(course.Subject);
        }

        // PUT
        // /api/course/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Course course)
        {
            if (course.Name == null) {
                return ValidationProblem("Name is required");
            }

            if (course.Description == null) {
                return ValidationProblem("Description is required");
            }

            _courseDAO.Update(course);

            return Ok(course);
        }

        // POST
        // /api/course
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Course course) 
        {
            if (course.Name == null) {
                return ValidationProblem("Name is required");
            }

            if (course.Description == null) {
                return ValidationProblem("Description is required");
            }

            _courseDAO.Create(course);

            return Created("", course);
        }

        // DELETE
        // /api/course/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Boolean courseExists = _courseDAO.CourseExists(id);

            if (!courseExists) return NotFound();

            _courseDAO.Delete(id);

            return Ok(_courseDAO.List());
        }
    }
}