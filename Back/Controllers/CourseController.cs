using System;
using System.Collections.Generic;
using System.Linq;
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

        public CourseController(DataContext dataContext) 
            => _dataContext = dataContext;
        
        // GET
        // /api/course
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_dataContext.Courses.ToList());

        // GET
        // /api/course/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Course course = _dataContext.Courses.Find(id);

            if (course == null) return NotFound();
            
            return Ok(course);
        }

        // PUT
        // /api/course/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Course course)
        {
            _dataContext.Courses.Update(course);
            _dataContext.SaveChanges();

            return Ok(course);
        }

        // POST
        // /api/course
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Course course) 
        {
            _dataContext.Courses.Add(course);
            _dataContext.SaveChanges();
            return Created("", course);
        }

        // DELETE
        // /api/course/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Course course = _dataContext.Courses.FirstOrDefault(
                course => course.Id == id
            );

            if (course == null) return NotFound();

            _dataContext.Courses.Remove(course);
            _dataContext.SaveChanges();

            return Ok(_dataContext.Courses.ToList());
        }
    }
}