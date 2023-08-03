using System;
using System.Collections.Generic;
using ElfG.Models;
using ElfG.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace ElfG.Repositories
{
    public class GroupSessionRepository : BaseRepository, IGroupSessionRepository
    {
        public GroupSessionRepository(IConfiguration configuration) : base(configuration) { }

        public List<GroupSession> GetAllSessions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserId, GroupId, StartTime, EndTime, Location,       Notes, GameTypeId, Date 
                    FROM GroupSession;";
                    var reader = cmd.ExecuteReader();
                    var sessions = new List<GroupSession>();
                    while (reader.Read())
                    {
                        sessions.Add(new GroupSession()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            StartTime = DbUtils.GetDateTime(reader, "StartTime"),
                            EndTime = DbUtils.GetDateTime(reader, "EndTime"),
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
        public void AddGroupSession(GroupSession session)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO GroupSession (UserId, GroupId, StartTime, EndTime, Location, Notes, GameTypeId, Date)
                        VALUES (@UserId, @GroupId, @StartTime, @EndTime, @Location, @Notes, @GameTypeId, @Date)";

                    cmd.Parameters.AddWithValue("@UserId", session.UserId);
                    cmd.Parameters.AddWithValue("@GroupId", session.GroupId);
                    cmd.Parameters.AddWithValue("@StartTime", session.StartTime);
                    cmd.Parameters.AddWithValue("@EndTime", session.EndTime);
                    cmd.Parameters.AddWithValue("@Location", session.Location);
                    cmd.Parameters.AddWithValue("@Notes", session.Notes);
                    cmd.Parameters.AddWithValue("@GameTypeId", session.GameTypeId);
                    cmd.Parameters.AddWithValue("@Date", session.Date);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGroupSession(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM GroupSession
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditGroupSession(GroupSession session)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE GroupSession
                        SET UserId = @UserId, GroupId = @GroupId, StartTime = @StartTime, EndTime = @EndTime,
                            Location = @Location, Notes = @Notes, GameTypeId = @GameTypeId, Date = @Date
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", session.Id);
                    cmd.Parameters.AddWithValue("@UserId", session.UserId);
                    cmd.Parameters.AddWithValue("@GroupId", session.GroupId);
                    cmd.Parameters.AddWithValue("@StartTime", session.StartTime);
                    cmd.Parameters.AddWithValue("@EndTime", session.EndTime);
                    cmd.Parameters.AddWithValue("@Location", session.Location);
                    cmd.Parameters.AddWithValue("@Notes", session.Notes);
                    cmd.Parameters.AddWithValue("@GameTypeId", session.GameTypeId);
                    cmd.Parameters.AddWithValue("@Date", session.Date);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public GroupSession GetSessionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, GroupId, StartTime, EndTime, Location, Notes, GameTypeId, Date
                        FROM GroupSession
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();
                    GroupSession session = null;
                    if (reader.Read())
                    {
                        session = new GroupSession()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            StartTime = DbUtils.GetDateTime(reader, "StartTime"),
                            EndTime = DbUtils.GetDateTime(reader, "EndTime"),
                            Location = DbUtils.GetString(reader, "Location"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            GameTypeId = DbUtils.GetInt(reader, "GameTypeId"),
                            Date = DbUtils.GetDateTime(reader, "Date")
                        };
                    }

                    reader.Close();
                    return session;
                }
            }
        }

        public List<GroupSession> GetSessionsByGroupId(int groupId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, GroupId, StartTime, EndTime, Location, Notes, GameTypeId, Date
                        FROM GroupSession
                        WHERE GroupId = @GroupId";

                    cmd.Parameters.AddWithValue("@GroupId", groupId);

                    var reader = cmd.ExecuteReader();
                    var sessions = new List<GroupSession>();
                    while (reader.Read())
                    {
                        sessions.Add(new GroupSession()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            StartTime = DbUtils.GetDateTime(reader, "StartTime"),
                            EndTime = DbUtils.GetDateTime(reader, "EndTime"),
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
    }
}
