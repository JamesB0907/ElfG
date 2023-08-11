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
            if (group == null)
            {
                return BadRequest("Group object is null");
            }

            _groupRepository.AddGroup(group);
            return CreatedAtAction("Get", new { id = group.Id }, group);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGroup(int id)
        {
            var group = _groupRepository.GetGroupInfoById(id);
            if (group == null)
            {
                return NotFound();
            }

            _groupRepository.DeleteGroup(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult EditGroup(int id, Group group)
        {
            if (group == null || group.Id != id)
            {
                return BadRequest("Invalid group object");
            }

            var existingGroup = _groupRepository.GetGroupInfoById(id);
            if (existingGroup == null)
            {
                return NotFound();
            }

            _groupRepository.EditGroup(group);
            return NoContent();
        }
    }
}