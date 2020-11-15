using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }


        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "This is the secret";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);

            return (thing == null)? NotFound() : Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() 
        {
            var thing = _context.Users.Find(-1);

            var theThing = thing.ToString();

            return theThing;
        }

        [HttpGet("Bad-Request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is a bad bad bad request!.");
        }
    }
}