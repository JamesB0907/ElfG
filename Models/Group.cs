namespace ElfG.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<GroupNote>? GroupNotes { get; set; }
        public List<GroupMembership>? GroupMemberships { get; set; }
        public List<GroupSession>? GroupSessions { get; set; }
    }
}
