namespace ElfG.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string UserTypeName { get; set; }
        public static int PLAYER_ID => 1;
        public static int GAMEMASTER_ID => 2;
        public static int ADMIN_ID => 3;
    }
}
