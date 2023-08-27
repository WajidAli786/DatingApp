using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseAPIController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    private async Task<bool> IsUserExsist(string username)
    {
        return await _context.Users.AnyAsync(item => item.UserName == username.ToLower());
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
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

        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto dto)
    {
        var user = await _context.Users.Include(item => item.Photos).SingleOrDefaultAsync(item => item.UserName == dto.Username);

        if (user == null)
            return Unauthorized("Invalid Username!");

        using HMACSHA512 hmac = new(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));

        foreach (var (item, index) in computedHash.Select((item, index) => (item, index)))
            if (item != user.PasswordHash[index])
                return Unauthorized("Invalid Password!");

        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(item => item.IsMain)?.Url
        };
    }
}