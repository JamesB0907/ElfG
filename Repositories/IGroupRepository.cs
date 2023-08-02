using ElfG.Models;

namespace ElfG.Repositories
{
    public interface IGroupRepository
    {
        void AddGroup(Group group);
        void DeleteGroup(int id);
        void EditGroup(Group group);
        List<Group> GetAllGroups();
        Group GetGroupInfoById(int id);
    }
}