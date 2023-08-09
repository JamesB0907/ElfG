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
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public UserController(IConfiguration configuration)
        {
            _userRepository = new UserRepository(configuration);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpGet("GetAllGroupMemberships")]
        public IActionResult GetAllGroupMemberships()
        {
            return Ok(_userRepository.GetAllGroupMemberships());
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            User user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _userRepository.AddUser(user);
            return CreatedAtAction("GetUserById", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult EditUser(int id, [FromBody] User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest("Invalid user object");
            }

            var existingUser = _userRepository.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            _userRepository.EditUser(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userRepository.DeleteUser(id);
            return NoContent();
        }

        [HttpGet("{userId}/groups")]
        public IActionResult GetGroupsByUserId(int userId)
        {
            return Ok(_userRepository.GetGroupsByUserId(userId));
        }

        [HttpGet("{userId}/sessions")]
        public IActionResult GetSessionsByUserId(int userId)
        {
            return Ok(_userRepository.GetSessionsByUserId(userId));
        }

        [HttpPost("{userId}/join-group/{groupId}")]
        public IActionResult JoinGroup(GroupMembership groupMembership)
        {
            _userRepository.JoinGroup(groupMembership);
            return CreatedAtAction("GetAllGroupMemberships", new { id = groupMembership.Id }, groupMembership);
        }

        [HttpDelete("{userId}/leave-group/{groupId}")]
        public IActionResult LeaveGroup(int userId, int groupId)
        {
            _userRepository.LeaveGroup(userId, groupId);
            return NoContent();
        }


        [HttpPost("{userId}/join-session/{sessionId}")]
        public IActionResult JoinSession(int userId, int sessionId)
        {
            _userRepository.JoinSession(userId, sessionId);
            return NoContent();
        }

        [HttpDelete("{userId}/leave-session/{sessionId}")]
        public IActionResult LeaveSession(int userId, int sessionId)
        {
            _userRepository.LeaveSession(userId, sessionId);
            return NoContent();
        }
    }
}
