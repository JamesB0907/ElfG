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

        // GET: api/GroupNote/5
        [HttpGet("{groupId}")]
        public IActionResult GetGroupNotesByGroupId(int groupId)
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
        public IActionResult AddGroupNote([FromBody] GroupNote groupNote)
        {
            if (groupNote == null)
            {
                return BadRequest("Group note object is null");
            }

            _groupNoteRepository.AddGroupNote(groupNote);
            return CreatedAtAction(nameof(GetGroupNoteById), new { id = groupNote.Id }, groupNote);
        }

        // PUT: api/GroupNote/5
        [HttpPut("{id}")]
        public IActionResult EditGroupNote(int id, [FromBody] GroupNote groupNote)
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
