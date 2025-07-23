using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly FacialRecognitionDbContext _context;
    private readonly ILogger<UsersController> _logger;

    public UsersController(FacialRecognitionDbContext context, ILogger<UsersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    // GET: api/users/face-descriptor
    [HttpGet("face-descriptor")]
    public async Task<ActionResult<IEnumerable<object>>> GetFaceDescriptors()
    {
        var users = await _context.Users
            .Where(u => u.FaceDescriptorId != null)
            .Select(u => new { u.FaceDescriptorId, u.FullName, u.FaceDescriptorJSON })
            .ToListAsync();
        return Ok(users);
    }

}