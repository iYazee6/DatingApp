using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
         void Update(AppUser user);

         Task<bool> SaveAllAsync();

         Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

         Task<AppUser> GetUserByUsername(string username);

        // Section 8: Using Auto mapper (Lesson 97)
         Task<IEnumerable<MemberDto>> GetMembersAsync();
         Task<MemberDto> GetMemberByUsernameAsync(string username);

    }
}