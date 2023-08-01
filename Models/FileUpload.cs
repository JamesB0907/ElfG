namespace ElfG.Models
{
    public class FileUpload
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string File { get; set; }
        public DateTime UploadedOn { get; set; }
        public int UploadedBy { get; set; }
        public User UploadedByUser { get; set; }

    }
}
