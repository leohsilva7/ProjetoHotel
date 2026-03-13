namespace ProjetoHotelStayEasy.Api.Models.DTOs
{
    public class CriarHotelDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
    }
}
