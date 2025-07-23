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
        return Ok("All users will be returned here.");
        // try
        // {
        //     var users = await _context.Users
        //         .Where(u => u.IsActive)
        //         .Select(u => new
        //         {
        //             u.Id,
        //             u.Username,
        //             u.Email,
        //             u.FullName,
        //             u.CreatedAt,
        //             FaceEncodingsCount = u.FaceEncodings.Count(),
        //             RecognitionLogsCount = u.RecognitionLogs.Count()
        //         })
        //         .ToListAsync();

        //     return Ok(users);
        // }
        // catch (Exception ex)
        // {
        //     _logger.LogError(ex, "Error retrieving users");
        //     return StatusCode(500, "Internal server error");
        // }
    }

}