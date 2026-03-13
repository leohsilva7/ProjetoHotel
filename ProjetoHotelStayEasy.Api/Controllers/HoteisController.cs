using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoHotelStayEasy.Api.Data;
using ProjetoHotelStayEasy.Api.Models;
using ProjetoHotelStayEasy.Api.Models.DTOs;
using System.Collections.Immutable;

namespace ProjetoHotelStayEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoteisController : ControllerBase
    {
        private readonly AppDbContext _context;
        public HoteisController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Hotel>>> GetAll()
        {
            var hoteis = await _context.Hoteis
                .Select(h => new HotelDto
                {
                    Id = h.Id,
                    Nome = h.Nome,
                    QtdEstrelas = h.QtdEstrelas,
                }).ToListAsync();
            return Ok(hoteis);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<DetalhesHotelDto>> GetById(int id)
        {
            var hotel = await _context.Hoteis
                .Where(h => h.Id == id)
                .Include(h => h.Quartos)
                .Select(h => new DetalhesHotelDto
                {
                    Id = h.Id,
                    Nome = h.Nome,
                    Cidade = h.Cidade,
                    QtdEstrelas = h.QtdEstrelas,
                    Quartos = h.Quartos.Select(q => new QuartoDto { Id = q.Id, Tipo = q.Tipo, Preco = q.Preco, NomeHotel = h.Nome }).ToList()
                }).FirstOrDefaultAsync();
            if (hotel == null)
                return NotFound();
            return Ok(hotel);
        }
        [HttpPost]
        public async Task<IActionResult> CreateHotel(CriarHotelDto dto)
        {
            var newHotel = new Hotel
            {
                Nome = dto.Nome,
                Cidade = dto.Cidade,
                QtdEstrelas = dto.QtdEstrelas
            };
            _context.Hoteis.Add(newHotel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = newHotel.Id }, newHotel);
        }
    }
}
