using API.Dtos;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikeRepository
    {
        Task<AppUser> GetUserWithLikes(int userId);

        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);

        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
    }
}