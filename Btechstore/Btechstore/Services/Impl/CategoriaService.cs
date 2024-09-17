using Btechstore.Datos;
using Microsoft.EntityFrameworkCore;

namespace Btechstore.Services.Impl
{
    public class CategoriaService : ICategoria
    {
        private readonly BtechstoreContext _context;
        public CategoriaService(BtechstoreContext context)
        {
            _context = context;
        }
        public async Task AgregarCategorias(string nombre)
        {
            Categorium categoria = new();
            categoria.Nombre = nombre;  
            _context.Categoria.Add(categoria);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Categorium>> ConsultarCategorias()
        {
            List<Categorium> categorias = new(); 
            categorias= await _context.Categoria.ToListAsync();
            return categorias;
        }
        public async Task EliminarCategorias(int id)
        {
            // Buscar la categoría que coincida con el id proporcionado
            Categorium categoria = await _context.Categoria.FirstOrDefaultAsync(c => c.Id == id);

            // Verificar si la categoría existe
            if (categoria != null)
            {
                // Eliminar la categoría
                _context.Categoria.Remove(categoria);
                await _context.SaveChangesAsync();
            }
        }
    }
}
