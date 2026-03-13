namespace ProjetoHotelStayEasy.Api.Models.DTOs
{
    public class CriarQuartoDto
    {
        public int HotelId { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Preco { get; set; }
    }
}
