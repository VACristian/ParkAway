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
    public class IndividualSpacesController : ControllerBase
    {
        private readonly ParkContext _context;

        public IndividualSpacesController(ParkContext context)
        {
            _context = context;
        }

        
        [HttpPost]

        public async Task<ActionResult<IndividualSpaces>> PostIndividualSpace(IndividualSpaces individualSpaces)
        {

           

            if (_context.IndividualSpaces == null)
            {
                return Problem("Entity set 'ParkContext.IndividualSpaces'  is null.");
            }


            _context.IndividualSpaces.Add(individualSpaces);
            await _context.SaveChangesAsync();

            return Ok();
        }


        // GET: api/IndividualSpaces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndividualSpaces>>> GetIndividualSpaces()
        {
          if (_context.IndividualSpaces == null)
          {
              return NotFound();
          }
            return await _context.IndividualSpaces.ToListAsync();
        }

        // GET: api/IndividualSpaces/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<IndividualSpaces>> GetIndividualSpace(int Id)
        {
            if (_context.IndividualSpaces == null)
            {
                return NotFound();
            }
            var IndividualSpace = await _context.IndividualSpaces.FindAsync(Id);

            if (IndividualSpace == null)
            {
                return NotFound();
            }

            return IndividualSpace;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutIndividualSpace(int id, IndividualSpaces individualSpace)
        {
            if (id != individualSpace.Id)
            {
                return BadRequest();
            }

            _context.Entry(individualSpace).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndividualSpaceExists(id))
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
        private bool IndividualSpaceExists(int id)
        {
            return (_context.IndividualSpaces?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
