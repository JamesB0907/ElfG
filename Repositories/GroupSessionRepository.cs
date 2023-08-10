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

        public List<GameType> GetGameTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM GameType";
                    var reader = cmd.ExecuteReader();
                    var gameTypes = new List<GameType>();
                    while (reader.Read())
                    {
                        gameTypes.Add(new GameType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }
                    reader.Close();
                    return gameTypes;
                }
            }
        }

        public List<GroupSession> GetAllSessions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT gs.Id, gs.UserId, gs.GroupId, gs.StartTime, gs.EndTime, 
                       gs.Location, gs.Notes, gs.GameTypeId, gs.Date,
                       gt.Id AS GameTypeId, gt.Name AS GameTypeName
                FROM GroupSession gs
                INNER JOIN GameType gt ON gs.GameTypeId = gt.Id;";

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
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            GameType = new GameType
                            {
                                Id = DbUtils.GetInt(reader, "GameTypeId"),
                                Name = DbUtils.GetString(reader, "GameTypeName")
                            }
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
                        OUTPUT INSERTED.ID
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
                        SET StartTime = @StartTime, EndTime = @EndTime,
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
                SELECT gs.Id, gs.UserId, gs.GroupId, gs.StartTime, gs.EndTime, gs.Location, gs.Notes,
                       gs.GameTypeId, gs.Date, gt.Id AS GameTypeId, gt.Name AS GameTypeName
                FROM GroupSession gs
                JOIN GameType gt ON gs.GameTypeId = gt.Id
                WHERE gs.Id = @Id";

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
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            GameType = new GameType
                            {
                                Id = DbUtils.GetInt(reader, "GameTypeId"),
                                Name = DbUtils.GetString(reader, "GameTypeName")
                            }
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
                SELECT gs.Id, gs.UserId, gs.GroupId, gs.StartTime, gs.EndTime, gs.Location, gs.Notes,
                       gs.GameTypeId, gs.Date, gt.Id AS GameTypeId, gt.Name AS GameTypeName
                FROM GroupSession gs
                JOIN GameType gt ON gs.GameTypeId = gt.Id
                WHERE gs.GroupId = @GroupId";

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
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            GameType = new GameType
                            {
                                Id = DbUtils.GetInt(reader, "GameTypeId"),
                                Name = DbUtils.GetString(reader, "GameTypeName")
                            }
                        });
                    }

                    reader.Close();
                    return sessions;
                }
            }
        }

    }
}
