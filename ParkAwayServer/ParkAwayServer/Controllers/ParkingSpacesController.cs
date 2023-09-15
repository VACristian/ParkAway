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
    public class ParkingSpacesController : ControllerBase
    {
        private readonly ParkContext _context;

        public ParkingSpacesController(ParkContext context)
        {
            _context = context;
        }

        
        [HttpPost]

        public async Task<ActionResult<ParkingSpaces>> PostParkingSpace(ParkingSpaces parkingSpace)
        {

           

            if (_context.ParkingSpaces == null)
            {
                return Problem("Entity set 'ParkContext.ParkingSpaces'  is null.");
            }


            _context.ParkingSpaces.Add(parkingSpace);
            await _context.SaveChangesAsync();

            return Ok(parkingSpace);
        }


        // GET: api/ParkingSpaces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkingSpaces>>> GetParkingSpaces()
        {
          if (_context.ParkingSpaces == null)
          {
              return NotFound();
          }
            return await _context.ParkingSpaces.ToListAsync();
        }

        // GET: api/ParkingSpaces/5
        [HttpGet("{SpaceId}")]
        public async Task<ActionResult<ParkingSpaces>> GetParkingSpace(int SpaceId)
        {
          if (_context.ParkingSpaces == null)
          {
              return NotFound();
          }
            var parkingSpace = await _context.ParkingSpaces.FindAsync(SpaceId);

            if (parkingSpace == null)
            {
                return NotFound();
            }

            return parkingSpace;
        }

        // DELETE: api/ParkingSpaces/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ParkingSpaces>> DeleteParkingSpace(int id)
        {
            if (_context.ParkingSpaces == null)
            {
                return NotFound();
            }
            var parkingSpace = await _context.ParkingSpaces.FindAsync(id);
            if (parkingSpace == null)
            {
                return NotFound();
            }

            _context.ParkingSpaces.Remove(parkingSpace);
            await _context.SaveChangesAsync();
            Console.WriteLine("Sters" +parkingSpace.Name +id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingSpace(int id, ParkingSpaces parkingSpace)
        {
            if (id != parkingSpace.SpaceId)
            {
                return BadRequest();
            }

            _context.Entry(parkingSpace).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingSpaceExists(id))
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
        private bool ParkingSpaceExists(int id)
        {
            return (_context.ParkingSpaces?.Any(e => e.SpaceId == id)).GetValueOrDefault();
        }
    }
}
