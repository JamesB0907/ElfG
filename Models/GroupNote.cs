namespace ElfG.Models
{
    public class GroupNote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime RelDate { get; set; }
        public DateTime PostedOn { get; set; }
        public User User { get; set; }
        public Group Group { get; set; }
    }
}
