using API.Dtos;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikeRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, targetUserId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var likes = _context.Likes.AsQueryable();
            var users = _context.Users.OrderBy(item => item.UserName).AsQueryable();

            if (likesParams.Predicate == "liked")
            {
                likes = likes.Where(item => item.SourceUserId == likesParams.UserId);
                users = likes.Select(item => item.TargetUser);
            }

            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(item => item.TargetUserId == likesParams.UserId);
                users = likes.Select(item => item.SourceUser);
            }

            var likedUsers = users.Select(item => new LikeDto
            {
                UserName = item.UserName,
                KnownAs = item.KnownAs,
                Age = item.DateOfBirth.CalculateAge(),
                PhotoUrl = item.Photos.FirstOrDefault(item => item.IsMain).Url,
                City = item.City,
                Id = item.Id
            });

            return await PagedList<LikeDto>.CreateAsync(likedUsers, likesParams.PageNumber, likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
            .Include(item => item.LikedUsers)
            .FirstOrDefaultAsync(item => item.Id == userId);
        }
    }
}