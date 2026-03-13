namespace ProjetoHotelStayEasy.Api.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
        public List<Quarto> Quartos { get; set; } = new List<Quarto>();
    }
}
