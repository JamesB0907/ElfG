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

            return null; // Return null if no group with the given id is found
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
