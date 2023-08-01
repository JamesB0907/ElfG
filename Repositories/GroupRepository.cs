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
                            GroupName = DbUtils.GetString(reader, "GroupName"),
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
            // Placeholder implementation
            throw new NotImplementedException();
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
