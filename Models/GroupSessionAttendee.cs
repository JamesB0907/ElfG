namespace ElfG.Models
{
    public class GroupSessionAttendee
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public int UserId { get; set; }
        public GroupSession Session { get; set; }
        public User User { get; set; } 
    }
}
