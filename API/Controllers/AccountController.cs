using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseAPIController
{
    private readonly DataContext _context;

    public AccountController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDto dto)
    {
        if (await IsUserExsist(dto.Username)) return BadRequest("");

        using HMACSHA512 hmac = new();

        AppUser user = new()
        {
            UserName = dto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    private async Task<bool> IsUserExsist(string username)
    {
        return await _context.Users.AnyAsync(item => item.UserName == username.ToLower());
    }
}