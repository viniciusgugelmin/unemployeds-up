using System;
using System.Collections.Generic;
using System.Linq;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/administrator")]
    public class AdministratorController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public AdministratorController(DataContext dataContext) 
            => _dataContext = dataContext;
        
        // GET
        // /api/administrator
        [HttpGet]
        [Route("")]
        public IActionResult Get() => Ok(_dataContext.Administrators.ToList());

        // GET
        // /api/administrator/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] Int32 id)
        {
            Administrator administrator = _dataContext.Administrators.Find(id);

            if (administrator == null) return NotFound();
            
            return Ok(administrator);
        }

        // PUT
        // /api/administrator
        [HttpPut]
        [Route("")]
        public IActionResult Update([FromBody] Administrator administrator)
        {
            _dataContext.Administrators.Update(administrator);
            _dataContext.SaveChanges();

            return Ok(administrator);
        }

        // POST
        // /api/administrator
        [HttpPost]
        [Route("")]
        public IActionResult Create([FromBody] Administrator administrator) 
        {
            _dataContext.Administrators.Add(administrator);
            _dataContext.SaveChanges();
            return Created("", administrator);
        }

        // DELETE
        // /api/administrator/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById([FromRoute] Int32 id)
        {
            Administrator administrator = _dataContext.Administrators.FirstOrDefault(
                administrator => administrator.Id == id
            );

            if (administrator == null) return NotFound();

            _dataContext.Administrators.Remove(administrator);
            _dataContext.SaveChanges();

            return Ok(_dataContext.Administrators.ToList());
        }
    }
}