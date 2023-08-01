using ElfG.Models;
using ElfG.Utils;

namespace ElfG.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IConfiguration configuration) : base(configuration) { }

        public List<Group> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT g.Id AS GroupId, g.GroupName AS GroupName, g.[Description] AS GroupDescription
                    FROM [Group] g";

                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();
                    while (reader.Read())
                    {
                        groups.Add(new Group()
                        {
                            Id = DbUtils.GetInt(reader, "GroupId"),
                            Name = DbUtils.GetString(reader, "GroupName"),
                            Description = DbUtils.GetString(reader, "GroupDescription")
                        });
                    }
                    reader.Close();
                    return groups;
                }
            }
        }
        public Group GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT g.GroupName AS GroupName, g.[Description] AS GroupDescription,

                    gn.Id AS GNId, gn.UserId AS GNUserId, gn.GroupId AS GNGroupId, COALESCE(gn.[Type], 
                    'N/A') AS GNType, COALESCE(gn.Title,'N/A') AS GNTitle,COALESCE(gn.[Text],'N/A') AS GNText,
                    gn.RelDate AS GNRelDate, gn.PostedOn AS GNPostedOn,

                    gs.Id AS GSId, gs.UserId AS GSUserId, gs.StartTime AS GSStartTime, gs.EndTime AS GSEndTime,
                    COALESCE(gs.[Location],'N/A') AS GSLocation, COALESCE(gs.Notes,'N/A') AS GSNotes, gs.GameTypeId
                    AS GSGameTypeId,

                    gm.Id AS MemId, gm.UserId AS MemUserId
                FROM [Group] g
                    LEFT JOIN GroupNote gn ON g.Id = gn.GroupId 
                    LEFT JOIN GroupSession gs ON g.Id = gs.GroupId  
                    LEFT JOIN GroupMembership gm ON g.Id = gm.GroupId
                WHERE g.Id = @Id
                ORDER BY g.Id DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Group group = null;
                    while (reader.Read())
                    {
                        if (group == null)
                        {
                            group = new Group()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "GroupName"),
                                Description = DbUtils.GetString(reader, "GroupDescription")
                            };
                        }

                        var noteId = DbUtils.GetInt(reader, "GNId");
                        if (noteId != 0)
                        {
                            group.GroupNotes.Add(new GroupNote()
                            {
                                Id = noteId,
                                UserId = DbUtils.GetInt(reader, "GNUserId"),
                                GroupId = DbUtils.GetInt(reader, "GNGroupId"),
                                Type = DbUtils.GetString(reader, "GNType"),
                                Title = DbUtils.GetString(reader, "GNTitle"),
                                Text = DbUtils.GetString(reader, "GNText"),
                                RelDate = DbUtils.GetDateTime(reader, "GNRelDate"),
                                PostedOn = DbUtils.GetDateTime(reader, "GNPostedOn")
                            });
                        }

                        var sessionId = DbUtils.GetInt(reader, "GSId");
                        if (sessionId != 0)
                        {
                            group.GroupSessions.Add(new GroupSession()
                            {
                                Id = sessionId,
                                UserId = DbUtils.GetInt(reader,"GSUserId"),
                                GroupId = id,
                                StartTime = DbUtils.GetDateTime(reader,"GSStartTime"),
                                EndTime = DbUtils.GetDateTime(reader, "GSEndTime"),
                                GameTypeId = DbUtils.GetInt(reader, "GSGameTypeId"),
                                Date = DbUtils.GetDateTime(reader, "GSDate"),
                                Location = DbUtils.GetString(reader, "GSLocation"),
                                Notes = DbUtils.GetString(reader, "GSNotes")
                            });
                        }

                        var memberId = DbUtils.GetInt(reader, "MemId");
                        if (memberId != 0)
                        {
                            group.GroupMemberships.Add(new GroupMembership()
                            {
                                Id = memberId,
                                UserId = DbUtils.GetInt(reader, "MemUserId"),
                                GroupId = id
                            });
                        }
                    }

                    return group;
                }
            }
        }


        public void AddGroup(Group group)
        {
            // Placeholder implementation
            throw new NotImplementedException();
        }

        public void DeleteGroup(int id)
        {
            // Placeholder implementation
            throw new NotImplementedException();
        }

        public void EditGroup(Group group)
        {
            // Placeholder implementation
            throw new NotImplementedException();
        }
    }
}
