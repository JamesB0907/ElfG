using ElfG.Models;
using ElfG.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace ElfG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly GroupRepository _groupRepository;

        public GroupController(IConfiguration configuration)
        {
            _groupRepository = new GroupRepository(configuration);
        }

        [HttpGet]
        public ActionResult<List<Group>> GetAllGroups()
        {
            var groups = _groupRepository.GetAll();
            return Ok(groups);
        }

        [HttpGet("{id}")]
        public ActionResult<Group> GetGroupById(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult AddGroup([FromBody] Group group)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGroup(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public IActionResult EditGroup(int id, [FromBody] Group group)
        {
            throw new NotImplementedException();
        }
    }
}
