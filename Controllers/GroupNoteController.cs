using Microsoft.AspNetCore.Mvc;
using ElfG.Models;
using ElfG.Repositories;

namespace ElfG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupNoteController : ControllerBase
    {
        private readonly IGroupNoteRepository _groupNoteRepository;

        public GroupNoteController(IGroupNoteRepository groupNoteRepository)
        {
            _groupNoteRepository = groupNoteRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_groupNoteRepository.GetAllNotes());
        }


        // GET: api/GroupNote/5
        [HttpGet("GroupBy/{groupId}")]
        public IActionResult GetGroupNotesById(int groupId)
        {
            var groupNotes = _groupNoteRepository.GetNotesByGroupId(groupId);
            if (groupNotes.Count == 0)
            {
                return NotFound();
            }

            return Ok(groupNotes);
        }

        // POST: api/GroupNote
        [HttpPost]
        public IActionResult AddGroupNote(GroupNote groupNote)
        {
            if (groupNote == null)
            {
                return BadRequest("Group note object is null");
            }

            _groupNoteRepository.AddGroupNote(groupNote);
            return CreatedAtAction("Get", new { id = groupNote.Id }, groupNote);
        }

        // PUT: api/GroupNote/5
        [HttpPut]
        public IActionResult EditGroupNote(int id, GroupNote groupNote)
        {
            if (groupNote == null || groupNote.Id != id)
            {
                return BadRequest("Invalid group note object");
            }

            var existingGroupNote = _groupNoteRepository.GetNoteById(id);
            if (existingGroupNote == null)
            {
                return NotFound();
            }

            _groupNoteRepository.EditGroupNote(groupNote);
            return NoContent();
        }

        // DELETE: api/GroupNote/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGroupNote(int id)
        {
            var groupNote = _groupNoteRepository.GetNoteById(id);
            if (groupNote == null)
            {
                return NotFound();
            }

            _groupNoteRepository.DeleteGroupNote(id);
            return NoContent();
        }
    }
}
