namespace ElfG.Models
{
    public class GroupSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public int GameTypeId { get; set; }
        public DateTime Date { get; set; }
        public GameType? GameType { get; set; }
    }
}
