namespace ProjetoHotelStayEasy.Api.Models.DTOs
{
    public class DetalhesHotelDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
        public List<QuartoDto> Quartos { get; set; } = new List<QuartoDto>();
    }
}
