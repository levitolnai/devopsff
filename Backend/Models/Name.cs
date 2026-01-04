namespace NameDrawer.Api.Models;

public class Name
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
