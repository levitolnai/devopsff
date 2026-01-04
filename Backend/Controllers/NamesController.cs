using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NameDrawer.Api.Data;
using NameDrawer.Api.Models;

namespace NameDrawer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NamesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NamesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/names
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Name>>> GetNames()
    {
        return await _context.Names.OrderBy(n => n.FullName).ToListAsync();
    }

    // GET: api/names/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Name>> GetName(int id)
    {
        var name = await _context.Names.FindAsync(id);

        if (name == null)
        {
            return NotFound();
        }

        return name;
    }

    // POST: api/names
    [HttpPost]
    public async Task<ActionResult<Name>> AddName([FromBody] AddNameRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName))
        {
            return BadRequest("Name cannot be empty");
        }

        var name = new Name
        {
            FullName = request.FullName.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Names.Add(name);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetName), new { id = name.Id }, name);
    }

    // GET: api/names/random
    [HttpGet("random")]
    public async Task<ActionResult<Name>> DrawRandom()
    {
        var count = await _context.Names.CountAsync();

        if (count == 0)
        {
            return NotFound("No names available to draw from");
        }

        var random = new Random();
        var skip = random.Next(0, count);

        var randomName = await _context.Names
            .OrderBy(n => n.Id)
            .Skip(skip)
            .FirstOrDefaultAsync();

        return randomName!;
    }

    // DELETE: api/names/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteName(int id)
    {
        var name = await _context.Names.FindAsync(id);
        
        if (name == null)
        {
            return NotFound();
        }

        _context.Names.Remove(name);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/names
    [HttpDelete]
    public async Task<IActionResult> DeleteAllNames()
    {
        var names = await _context.Names.ToListAsync();
        _context.Names.RemoveRange(names);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class AddNameRequest
{
    public string FullName { get; set; } = string.Empty;
}
