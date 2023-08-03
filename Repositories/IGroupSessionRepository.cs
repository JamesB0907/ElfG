using ElfG.Models;

namespace ElfG.Repositories
{
    public interface IGroupSessionRepository
    {
        List<GroupSession> GetAllSessions();
        void AddGroupSession(GroupSession session);
        void DeleteGroupSession(int id);
        void EditGroupSession(GroupSession session);
        GroupSession GetSessionById(int id);
        List<GroupSession> GetSessionsByGroupId(int groupId);
    }
}