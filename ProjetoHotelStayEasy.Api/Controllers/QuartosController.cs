using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoHotelStayEasy.Api.Data;
using ProjetoHotelStayEasy.Api.Models;
using ProjetoHotelStayEasy.Api.Models.DTOs;

namespace ProjetoHotelStayEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuartosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuartosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Quarto>>> GetAll()
        {
            var quartos = await _context.Quartos
                .Include(q => q.Hotel)
                .Select(q => new QuartoDto
                {
                    Id = q.Id,
                    Tipo = q.Tipo,
                    Preco = q.Preco,
                    NomeHotel = q.Hotel.Nome
                }).ToListAsync();
            return Ok(quartos);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<QuartoDto>> GetById(int id)
        {
            var quarto = await _context.Quartos
                .Where(q => q.Id == id)
                .Include(q => q.Hotel)
                .Select(q => new QuartoDto
                {
                    Id = q.Id,
                    Tipo = q.Tipo,
                    Preco = q.Preco,
                    NomeHotel = q.Hotel.Nome
                }).FirstOrDefaultAsync();
            if (quarto == null)
            {
                return NotFound();
            }
            return Ok(quarto);
        }
        [HttpPost]
        public async Task<IActionResult> CreateQuarto(CriarQuartoDto dto)
        {
            var newQuarto = new Quarto
            {
                HotelId = dto.HotelId,
                Tipo = dto.Tipo,
                Preco = dto.Preco
            };
            _context.Quartos.Add(newQuarto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = newQuarto.Id }, newQuarto);
        }
    }
}
