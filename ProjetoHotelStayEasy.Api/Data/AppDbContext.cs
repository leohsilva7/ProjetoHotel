using Microsoft.EntityFrameworkCore;
using ProjetoHotelStayEasy.Api.Models;

namespace ProjetoHotelStayEasy.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Hotel> Hoteis{ get; set; }
        public DbSet<Quarto> Quartos { get; set; }
    }
}
