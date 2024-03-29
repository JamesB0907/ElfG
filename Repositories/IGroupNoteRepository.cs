﻿using ElfG.Models;

namespace ElfG.Repositories
{
    public interface IGroupNoteRepository
    {
        List<GroupNote> GetAllNotes();
        void AddGroupNote(GroupNote note);
        void DeleteGroupNote(int id);
        void EditGroupNote(GroupNote note);
        GroupNote GetNoteById(int id);
        List<GroupNote> GetNotesByGroupId(int groupId);
    }
}