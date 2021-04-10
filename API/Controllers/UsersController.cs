using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        /*
                [HttpGet]
                public ActionResult<IEnumerable<AppUser>> GetUsers()
                {
                    var users = _context.Users.ToList();

                    return users;
                }
        */

        [HttpGet]
        // [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            /*
             * Before repo, This is using a context without The Repository Pattern
             * Section 8.87
            var users = await _context.Users.ToListAsync();
            return users;
            */
            
            /*
             * Section 8:97
             * Now we map the properties in the repository layer
            var users = await _repo.GetUsersAsync();
            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(usersToReturn);
            */

            var users = await _repo.GetMembersAsync();
            return Ok(users);
        }

        /*
        * Before repo, This is using a context without The Repository Pattern
        * Section 8.87 ~> Now we don't use it ....
        // api/3
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var users = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
            return users;
        }
        */

        // api/Yazeed
        [HttpGet("{username}")]
        //[Authorize]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            /*
             * Before repo, This is using a context without The Repository Pattern
             * Section 8.87
            var users = await _context.Users.Where(u => u.username.Equals(username)).FirstOrDefaultAsync();
            return users;
            */

            /*
             * Section 8:97 Auto Mapper
             * Now this is replaced with Mapping in the repo level
            var user = await _repo.GetUserByUsername(username);
            return _mapper.Map<MemberDto>(user);
            */

            return await _repo.GetMemberByUsernameAsync(username);
        }
        /*
                // api/3
                [HttpGet("{id}")]
                public ActionResult<AppUser> GetUsers(int id)
                {
                    var users = _context.Users.Where(u => u.Id == id).FirstOrDefault();

                    return users;
                }
        */

        [HttpPut]
        public async Task<ActionResult> UpdateUser (MemberUpdateDto memberUpdateDto){
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _repo.GetUserByUsername(username);

            _mapper.Map(memberUpdateDto, user);

            _repo.Update(user);

            return (await _repo.SaveAllAsync())? NoContent() : BadRequest("Failed to update user"); 
        }
    }
}