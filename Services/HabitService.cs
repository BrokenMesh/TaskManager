using Microsoft.JSInterop;
using TaskManager.Models;

namespace TaskManager.Services;

public class HabitService(IJSRuntime js)
{
    private bool _ready;

    private async Task EnsureReady()
    {
        if (_ready) return;
        await js.InvokeVoidAsync("habitStorage.openDB");
        _ready = true;
    }

    public async Task<List<Habit>> GetHabitsAsync()
    {
        await EnsureReady();
        var result = await js.InvokeAsync<List<Habit>>("habitStorage.getAll", "habits");
        return result ?? [];
    }

    public async Task SaveHabitAsync(Habit habit)
    {
        await EnsureReady();
        await js.InvokeVoidAsync("habitStorage.put", "habits", habit);
    }

    public async Task DeleteHabitAsync(string id)
    {
        await EnsureReady();
        await js.InvokeVoidAsync("habitStorage.remove", "habits", id);
    }

    public async Task<List<HabitEntry>> GetEntriesAsync(string habitId)
    {
        await EnsureReady();
        var result = await js.InvokeAsync<List<HabitEntry>>("habitStorage.getByIndex", "entries", "habitId", habitId);
        return result ?? [];
    }

    public async Task SaveEntryAsync(HabitEntry entry)
    {
        await EnsureReady();
        await js.InvokeVoidAsync("habitStorage.put", "entries", entry);
    }

    public async Task DeleteEntryAsync(string id)
    {
        await EnsureReady();
        await js.InvokeVoidAsync("habitStorage.remove", "entries", id);
    }
}
