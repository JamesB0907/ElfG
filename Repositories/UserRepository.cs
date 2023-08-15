using ElfG.Models;
using ElfG.Utils;

namespace ElfG.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.Username, u.Email, u.UserTypeId, ut.UserTypeName
                        FROM [User] u
                        LEFT JOIN UserType ut ON u.UserTypeId = ut.Id";

                    var reader = cmd.ExecuteReader();
                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                UserTypeName = DbUtils.GetString(reader, "UserTypeName")
                            }
                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Username, Email, UserTypeId
                        FROM [User]
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Username = DbUtils.GetString(reader, "Username"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId")
                            };
                        }
                    }
                }
            }

            return null;
        }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.Username, u.Email, u.UserTypeId, ut.UserTypeName
                        FROM [User] u
                        LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE Email = @email;";
                    DbUtils.AddParameter(cmd, "@email", email);
                    User user = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserTypeName = DbUtils.GetString(reader, "UserTypeName")
                            }
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public void AddUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (Username, Email, UserTypeId)
                        VALUES (@Username, @Email, @UserTypeId);
                        SELECT SCOPE_IDENTITY();";

                    DbUtils.AddParameter(cmd, "@Username", user.Username);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);

                    user.Id = Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public void EditUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                        SET Username = @Username, Email = @Email, UserTypeId = @UserTypeId
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@Username", user.Username);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM [User]
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Group> GetGroupsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.GroupName, g.Description, g.UserId
                        FROM [Group] g
                        INNER JOIN GroupMembership gm ON g.Id = gm.GroupId
                        WHERE gm.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();
                    while (reader.Read())
                    {
                        groups.Add(new Group()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "GroupName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserId = DbUtils.GetInt(reader, "UserId")
                        });
                    }
                    reader.Close();
                    return groups;
                }
            }
        }

        public List<GroupSession> GetSessionsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT gs.Id, gs.UserId, gs.GroupId, gs.StartTime, gs.EndTime,
                               gs.Location, gs.Notes, gs.GameTypeId, gs.Date
                        FROM GroupSession gs
                        INNER JOIN GroupSessionAttendee gsa ON gs.Id = gsa.SessionId
                        WHERE gsa.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var sessions = new List<GroupSession>();
                    while (reader.Read())
                    {
                        sessions.Add(new GroupSession()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            StartTime = DbUtils.GetString(reader, "StartTime"),
                            EndTime = DbUtils.GetString(reader, "EndTime"),
                            Location = DbUtils.GetString(reader, "Location"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            GameTypeId = DbUtils.GetInt(reader, "GameTypeId"),
                            Date = DbUtils.GetDateTime(reader, "Date")
                        });
                    }
                    reader.Close();
                    return sessions;
                }
            }
        }

        public void JoinGroup(GroupMembership groupMembership)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO GroupMembership (UserId, GroupId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @GroupId)";

                    DbUtils.AddParameter(cmd, "@UserId", groupMembership.UserId);
                    DbUtils.AddParameter(cmd, "@GroupId", groupMembership.GroupId);

                    groupMembership.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void LeaveGroup(int userId, int groupId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM GroupMembership
                        WHERE UserId = @UserId AND GroupId = @GroupId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@GroupId", groupId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void JoinSession(GroupSessionAttendee groupSessionAttendee)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO GroupSessionAttendee (UserId, SessionId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @SessionId)";

                    DbUtils.AddParameter(cmd, "@UserId", groupSessionAttendee.UserId);
                    DbUtils.AddParameter(cmd, "@SessionId", groupSessionAttendee.SessionId);

                    groupSessionAttendee.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void LeaveSession(int userId, int sessionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM GroupSessionAttendee
                        WHERE UserId = @UserId AND SessionId = @SessionId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@SessionId", sessionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public List<GroupMembership> GetAllGroupMemberships()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, UserId, GroupId
                FROM GroupMembership";

                    var reader = cmd.ExecuteReader();
                    var groupMemberships = new List<GroupMembership>();
                    while (reader.Read())
                    {
                        groupMemberships.Add(new GroupMembership()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId")
                        });
                    }
                    reader.Close();
                    return groupMemberships;
                }
            }
        }
        public List<GroupSessionAttendee> GetAllSessionAttendees()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, UserId, SessionId
                FROM GroupSessionAttendee";
                    var reader = cmd.ExecuteReader();
                    var groupSessionAttendees = new List<GroupSessionAttendee>();
                    while (reader.Read())
                    {
                        groupSessionAttendees.Add(new GroupSessionAttendee()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader,"UserId"),
                            SessionId = DbUtils.GetInt(reader, "SessionId")
                        });
                    }
                    reader.Close();
                    return groupSessionAttendees;
                }  
            }
        }

    }
}
