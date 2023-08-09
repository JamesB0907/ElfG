﻿using ElfG.Models;

namespace ElfG.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        void DeleteUser(int id);
        void EditUser(User user);
        List<GroupMembership> GetAllGroupMemberships();
        List<User> GetAllUsers();
        User GetByEmail(string email);
        List<Group> GetGroupsByUserId(int userId);
        List<GroupSession> GetSessionsByUserId(int userId);
        User GetUserById(int id);
        void JoinGroup(GroupMembership groupMembership);
        void JoinSession(int userId, int sessionId);
        void LeaveGroup(int userId, int groupId);
        void LeaveSession(int userId, int sessionId);
    }
}