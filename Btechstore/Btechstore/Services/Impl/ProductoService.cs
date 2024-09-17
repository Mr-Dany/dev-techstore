
using Btechstore.Datos;
using Btechstore.Models;
using Microsoft.EntityFrameworkCore;

namespace Btechstore.Services.Impl
{
    public class ProductoService : IProducto
    {
        private readonly BtechstoreContext _context;
        public ProductoService(BtechstoreContext context)
        {
            _context = context; 
        }
        public async Task AgregarProductos(ProductoDto productoagregar)
        {
            Producto producto = new Producto();
            producto.Nombre = productoagregar.producto.Nombre;
            producto.Precio = productoagregar.producto.Precio;
            _context.Productos.Add(producto);   
            await _context.SaveChangesAsync(); 
            foreach (var item in productoagregar.categoria)
            {
                ProductosXcategoria productosXcategoria = new();
                productosXcategoria.ProductoId = producto.Id;
                productosXcategoria.CategoriaId = item;
                _context.ProductosXcategorias.Add(productosXcategoria);
                await _context.SaveChangesAsync();
            }
        } 
        public async Task<List<ProductoVista>> ConsultarProductos()
        {
            var productos = await _context.Productos
         .Include(x => x.ProductosXcategoria)
         .ThenInclude(y => y.Categoria)
         .ToListAsync();

            // Map to DTOs
            var productoDtos = productos.Select(p => new ProductoVista
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Precio = p.Precio,
                Categoria = p.ProductosXcategoria
                    .Select(px => new CategoriaDto
                    {
                        Id = px.Categoria.Id,
                        Nombre = px.Categoria.Nombre
                    })
                    .ToList()
            }).ToList();

            return productoDtos;
        }
        public async Task EliminarProductos(int id)
        {
            // Buscar y eliminar las asociaciones de productos y categorías
            var productocategorias = await _context.ProductosXcategorias
                .Where(pc => pc.Producto.Id == id)
                .ToListAsync();
            if (productocategorias.Any())
            {
                _context.ProductosXcategorias.RemoveRange(productocategorias);
                await _context.SaveChangesAsync();
            }

            // Buscar el producto específico por su id
            Producto producto = await _context.Productos
                .FirstOrDefaultAsync(p => p.Id == id);

            // Verificar si el producto existe y eliminarlo
            if (producto != null)
            {
                _context.Productos.Remove(producto);
                await _context.SaveChangesAsync();
            }
        }
    }
}
