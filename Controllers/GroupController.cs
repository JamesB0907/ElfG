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
        public IActionResult Get()
        {
            return Ok(_groupRepository.GetAllGroups());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Group group = _groupRepository.GetGroupInfoById(id);
            if (group == null)
            {
                return NotFound();
            }
            return Ok(group);
        }

        [HttpPost]
        public IActionResult AddGroup(Group group)
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
