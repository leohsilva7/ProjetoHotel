namespace ProjetoHotelStayEasy.Api.Models
{
    public class Quarto
    {
        public int Id { get; set; }
        public Hotel? Hotel { get; set; }
        public int HotelId { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Preco { get; set; }
    }
}
