using Btechstore.Datos;

namespace Btechstore.Services
{
    public interface ICategoria
    {
        Task  AgregarCategorias(string nombre);
        Task EliminarCategorias(int id);
        Task <List<Categorium>>  ConsultarCategorias();
    }
}
