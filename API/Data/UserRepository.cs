using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberByUsernameAsync(string username)
        {
            username = username.ToLower();

            return await _context.Users.Where(user => user.UserName.ToLower().Equals(username))
                    /* Section 8.
                     * .... This is Mapping data manually 
                    .Select(user => new MemberDto{
                        Id = user.Id,
                        Username = user.UserName
                        // Continue Mapping fields .... 
                    })
                    */
                    .ProjectTo<MemberDto>(_mapper.ConfigurationProvider) // This is using an Auto mapper
                    .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public Task<AppUser> GetUserByIdAsync(int id)
        {
            return _context.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<AppUser> GetUserByUsername(string username)
        {
            username = username.ToLower();
            return _context.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.UserName.ToLower().Equals(username));
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(u => u.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}