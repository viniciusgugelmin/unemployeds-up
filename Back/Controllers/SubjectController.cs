using System;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/subject")]
    public class SubjectController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public SubjectController(DataContext dataContext) 
            => _dataContext = dataContext;
        
        // GET
        // /api/subject
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_dataContext.Subjects.ToList());

        // GET
        // /api/subject/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Subject subject = _dataContext.Subjects.Find(id);

            if (subject == null) return NotFound();
            
            return Ok(subject);
        }

        // PUT
        // /api/subject/
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Subject subject)
        {
            _dataContext.Subjects.Update(subject);
            _dataContext.SaveChanges();

            return Ok(subject);
        }

        // POST
        // /api/subject
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Subject subject) 
        {
            _dataContext.Subjects.Add(subject);
            _dataContext.SaveChanges();
            return Created("", subject);
        }

        // DELETE
        // /api/subject/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Subject subject = _dataContext.Subjects.FirstOrDefault(
                subject => subject.Id == id
            );

            if (subject == null) return NotFound();

            _dataContext.Subjects.Remove(subject);
            _dataContext.SaveChanges();

            return Ok(_dataContext.Subjects.ToList());
        }
    }
}