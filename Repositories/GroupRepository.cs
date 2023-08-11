using ElfG.Models;
using ElfG.Utils;
using Microsoft.Data.SqlClient;

namespace ElfG.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IConfiguration configuration) : base(configuration) { }

        public List<Group> GetAllGroups()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, GroupName, [Description], UserId
                    FROM [Group] g";

                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();
                    while (reader.Read())
                    {
                        groups.Add(new Group()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "GroupName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserId = DbUtils.GetInt(reader,"UserId")
                        });
                    }
                    reader.Close();
                    return groups;
                }
            }
        }
        public Group GetGroupInfoById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = @"
                        SELECT Id, GroupName, [Description], UserId
                        FROM [Group]
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Group()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "GroupName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                UserId = DbUtils.GetInt(reader, "UserId")
                            };
                        }
                    }
                }
            }

            return null;
        }

        public void AddGroup(Group group)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Group] (GroupName, [Description], UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@GroupName, @Description, @UserId)";

                    DbUtils.AddParameter(cmd, "@GroupName", group.Name);
                    DbUtils.AddParameter(cmd, "@Description", group.Description);
                    DbUtils.AddParameter(cmd, "@UserId", group.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGroup(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM [Group]
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditGroup(Group group)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Group]
                        SET GroupName = @GroupName, [Description] = @Description
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", group.Id);
                    DbUtils.AddParameter(cmd, "@GroupName", group.Name);
                    DbUtils.AddParameter(cmd, "@Description", group.Description);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}