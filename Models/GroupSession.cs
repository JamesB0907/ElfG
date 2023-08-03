namespace ElfG.Models
{
    public class GroupSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public int GameTypeId { get; set; }
        public DateTime Date { get; set; }
        public GameType? GameType { get; set; }
        public Group? Group { get; set; }
        public User? UserCreated { get; set; }
        public List<GroupSessionAttendee>? Attendees { get; set; }
    }
}
