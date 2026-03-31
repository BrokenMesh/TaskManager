namespace TaskManager.Models;

public class HabitEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string HabitId { get; set; } = "";
    public string Date { get; set; } = ""; // yyyy-MM-dd
    public int Completeness { get; set; } = 100; // 0–100
    public string Notes { get; set; } = "";
}
