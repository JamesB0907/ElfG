using Microsoft.AspNetCore.Mvc;
using ElfG.Models;
using ElfG.Repositories;

namespace ElfG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupSessionController : ControllerBase
    {
        private readonly IGroupSessionRepository _groupSessionRepository;

        public GroupSessionController(IGroupSessionRepository groupSessionRepository)
        {
            _groupSessionRepository = groupSessionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_groupSessionRepository.GetAllSessions());
        }

        [HttpGet("GetGameTypes")]
        public IActionResult GetGameTypes()
        {
            return Ok(_groupSessionRepository.GetGameTypes());
        }

        // GET: api/GroupSession/5
        [HttpGet("{id}")]
        public IActionResult GetGroupSessionById(int id)
        {
            var groupSession = _groupSessionRepository.GetSessionById(id);
            if (groupSession == null)
            {
                return NotFound();
            }

            return Ok(groupSession);
        }

        // GET: api/GroupSession/ByGroup/5
        [HttpGet("GroupBy/{groupId}")]
        public IActionResult GetGroupSessionsByGroupId(int groupId)
        {
            var groupSessions = _groupSessionRepository.GetSessionsByGroupId(groupId);
            if (groupSessions.Count == 0)
            {
                return NotFound();
            }

            return Ok(groupSessions);
        }

        // POST: api/GroupSession
        [HttpPost]
        public IActionResult AddGroupSession(GroupSession groupSession)
        {
            if (groupSession == null)
            {
                return BadRequest("Group session object is null");
            }

            _groupSessionRepository.AddGroupSession(groupSession);
            return CreatedAtAction("Get", new { id = groupSession.Id }, groupSession);
        }

        // PUT: api/GroupSession/5
        [HttpPut]
        public IActionResult EditGroupSession(int id, GroupSession groupSession)
        {
            if (groupSession == null || groupSession.Id != id)
            {
                return BadRequest("Invalid group session object");
            }

            var existingGroupSession = _groupSessionRepository.GetSessionById(id);
            if (existingGroupSession == null)
            {
                return NotFound();
            }

            _groupSessionRepository.EditGroupSession(groupSession);
            return NoContent();
        }

        // DELETE: api/GroupSession/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGroupSession(int id)
        {
            var groupSession = _groupSessionRepository.GetSessionById(id);
            if (groupSession == null)
            {
                return NotFound();
            }

            _groupSessionRepository.DeleteGroupSession(id);
            return NoContent();
        }
    }
}
