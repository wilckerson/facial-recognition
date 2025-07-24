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

    //POST: api/users
    [HttpPost]
    public async Task<ActionResult> RegisterUser([FromBody] RegisterUserRequest requestData)
    {
        if (string.IsNullOrEmpty(requestData.FullName) || string.IsNullOrEmpty(requestData.FaceDescriptorJSON))
        {
            return BadRequest("Full name and face descriptor are required.");
        }

        var user = new Models.User
        {
            Id = Guid.NewGuid(),
            FullName = requestData.FullName,
            FaceDescriptorId = Guid.NewGuid(),
            FaceDescriptorJSON = requestData.FaceDescriptorJSON
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Created();
    }
    

    // GET: api/users/face-descriptor
    [HttpGet("face-descriptor")]
    public async Task<ActionResult<IEnumerable<object>>> GetFaceDescriptors()
    {
        var users = await _context.Users
            .Where(u => u.FaceDescriptorJSON != null && u.FaceDescriptorJSON != "[]")
            .Select(u => new { u.FaceDescriptorId, u.FullName, u.FaceDescriptorJSON })
            .ToListAsync();
        return Ok(users);
    }
}

public class RegisterUserRequest
{
    public string FullName { get; set; }
    public string FaceDescriptorJSON { get; set; }
}
