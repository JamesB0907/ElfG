using System;
using System.Collections.Generic;
using ElfG.Models;
using ElfG.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ElfG.Repositories
{
    public class GroupNoteRepository : BaseRepository, IGroupNoteRepository
    {
        public GroupNoteRepository(IConfiguration configuration) : base(configuration) { }

        public List<GroupNote> GetAllNotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserId, GroupId, Type, Title, [Text], RelDate, PostedOn 
                    FROM GroupNote;";
                    var reader = cmd.ExecuteReader();
                    var notes = new List<GroupNote>();
                    while (reader.Read())
                    {
                        notes.Add(new GroupNote()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Text = DbUtils.GetString(reader, "Text"),
                            RelDate = DbUtils.GetDateTime(reader, "RelDate"),
                            PostedOn = DbUtils.GetDateTime(reader, "PostedOn")
                        });
                    }
                    reader.Close();

                    return notes;
                }
            }
        }

        public List<GroupNote> GetNotesByGroupId(int groupId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, GroupId, [Type], Title, [Text], RelDate, PostedOn
                        FROM GroupNote
                        WHERE GroupId = @GroupId";

                    DbUtils.AddParameter(cmd, "@GroupId", groupId);

                    var reader = cmd.ExecuteReader();
                    var notes = new List<GroupNote>();
                    while (reader.Read())
                    {
                        notes.Add(new GroupNote()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Text = DbUtils.GetString(reader, "Text"),
                            RelDate = DbUtils.GetDateTime(reader, "RelDate"),
                            PostedOn = DbUtils.GetDateTime(reader, "PostedOn")
                        });
                    }
                    reader.Close();
                    return notes;
                }
            }
        }

        public GroupNote GetNoteById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, GroupId, [Type], Title, [Text], RelDate, PostedOn
                        FROM GroupNote
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    GroupNote note = null;
                    if (reader.Read())
                    {
                        note = new GroupNote()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GroupId = DbUtils.GetInt(reader, "GroupId"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Text = DbUtils.GetString(reader, "Text"),
                            RelDate = DbUtils.GetDateTime(reader, "RelDate"),
                            PostedOn = DbUtils.GetDateTime(reader, "PostedOn")
                        };
                    }

                    reader.Close();
                    return note;
                }
            }
        }

        public void AddGroupNote(GroupNote note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO GroupNote (UserId, GroupId, [Type], Title, [Text], RelDate, PostedOn)
                        VALUES (@UserId, @GroupId, @Type, @Title, @Text, @RelDate, @PostedOn)";

                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@GroupId", note.GroupId);
                    DbUtils.AddParameter(cmd, "@Type", note.Type);
                    DbUtils.AddParameter(cmd, "@Title", note.Title);
                    DbUtils.AddParameter(cmd, "@Text", note.Text);
                    DbUtils.AddParameter(cmd, "@RelDate", note.RelDate);
                    DbUtils.AddParameter(cmd, "@PostedOn", note.PostedOn);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGroupNote(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM GroupNote
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditGroupNote(GroupNote note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE GroupNote
                        SET UserId = @UserId, GroupId = @GroupId, [Type] = @Type, Title = @Title, [Text] = @Text, RelDate = @RelDate, PostedOn = @PostedOn
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", note.Id);
                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@GroupId", note.GroupId);
                    DbUtils.AddParameter(cmd, "@Type", note.Type);
                    DbUtils.AddParameter(cmd, "@Title", note.Title);
                    DbUtils.AddParameter(cmd, "@Text", note.Text);
                    DbUtils.AddParameter(cmd, "@RelDate", note.RelDate);
                    DbUtils.AddParameter(cmd, "@PostedOn", note.PostedOn);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
