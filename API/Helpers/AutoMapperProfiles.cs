using API.Dtos;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, AppUser>();

            CreateMap<RegisterDto, AppUser>();

            CreateMap<AppUser, MemberDto>().ForMember(item => item.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(item => item.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Message, MessageDto>()
            .ForMember(item => item.SenderPhotoUrl, item => item.MapFrom(s => s.Sender.Photos.FirstOrDefault(x => x.IsMain).Url)).ForMember(item => item.RecepientPhotoUrl, item => item.MapFrom(s => s.Recepient.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}