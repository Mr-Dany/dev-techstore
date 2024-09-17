using Btechstore.Datos;
using Btechstore.Models;

namespace Btechstore.Services
{
    public interface IProducto
    {
        Task AgregarProductos(ProductoDto producto);
        Task EliminarProductos(int id);
        Task<List<ProductoVista>> ConsultarProductos();
    }
}
