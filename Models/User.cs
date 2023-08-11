namespace ElfG.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int UserTypeId { get; set; }
        public Boolean? IsActive { get; set; }
        public UserType? UserType { get; set; }
    }
}
