namespace ElfG.Models
{
    public class GroupMembership
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public User? User { get; set; } 
        public Group? Group { get; set; }
    }
}
