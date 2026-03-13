namespace ProjetoHotelStayEasy.Api.Models.DTOs
{
    public class QuartoDto
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string NomeHotel { get; set; }
    }
}
