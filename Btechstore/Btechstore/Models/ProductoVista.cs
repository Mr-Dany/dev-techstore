namespace Btechstore.Models
{
    public class ProductoVista
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = null!;

        public decimal Precio { get; set; }

        public List< CategoriaDto>  Categoria { get; set; } 
    }
}
