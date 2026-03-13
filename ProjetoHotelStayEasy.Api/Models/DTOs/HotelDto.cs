namespace ProjetoHotelStayEasy.Api.Models.DTOs
{
    public class HotelDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
    }
}
