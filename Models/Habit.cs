namespace TaskManager.Models;

public class Habit
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Today).ToString("yyyy-MM-dd");
}
