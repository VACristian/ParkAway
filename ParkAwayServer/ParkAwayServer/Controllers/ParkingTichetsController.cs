using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkAwayServer.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ParkAwayServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingTichetsController : ControllerBase
    {
        private readonly ParkContext _context;

        public ParkingTichetsController(ParkContext context)
        {
            _context = context;
        }

        // POST: api/ParkingTichets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("create-tichet")]
        [HttpPost]

        public async Task<ActionResult<ParkingTichet>> PostParkingTichet(ParkingTichet parkingTichet)
        {
            
            if (_context.ParkingTichets == null)
            {
                return Problem("Entity set 'ParkContext.ParkingTichets'  is null.");
            }


            _context.ParkingTichets.Add(parkingTichet);
            await _context.SaveChangesAsync();

            return Ok();
        }


        // GET: api/ParkingTichets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkingTichet>>> GetParkingTichets()
        {
          if (_context.ParkingTichets == null)
          {
              return NotFound();
          }
            return await _context.ParkingTichets.ToListAsync();
        }

        // GET: api/ParkingTichets/5


        
        [HttpGet("{userId}")]
        
        public async Task<ActionResult<IEnumerable<ParkingTichet>>> GetParkingTichets(string userId)
        {
            var tichets = await _context.ParkingTichets.Where(t => t.UserId == userId).ToListAsync();
            if (tichets == null)
            {
                return NotFound();
            }
            return tichets;
        }
        


        // GET: api/ParkingTichets/user
        
        

        // PUT: api/ParkingTichets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingTichet(int id, ParkingTichet parkingTichet)
        {
            if (id != parkingTichet.TichetId)
            {
                return BadRequest();
            }

            _context.Entry(parkingTichet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingTichetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // DELETE: api/ParkingTichets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParkingTichet(int id)
        {
            if (_context.ParkingTichets == null)
            {
                return NotFound();
            }
            var parkingTichet = await _context.ParkingTichets.FindAsync(id);
            if (parkingTichet == null)
            {
                return NotFound();
            }

            _context.ParkingTichets.Remove(parkingTichet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParkingTichetExists(int id)
        {
            return (_context.ParkingTichets?.Any(e => e.TichetId == id)).GetValueOrDefault();
        }
    }
}
