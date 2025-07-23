using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

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
        try
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving users");
            return StatusCode(500, "Internal server error");
        }
    }

}