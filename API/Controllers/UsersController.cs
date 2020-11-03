using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;

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
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        // api/3
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUsers(int id)
        {
            var users = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            return users;
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
    }
}