using Btechstore.Datos;
using Btechstore.Models;
using Btechstore.Services;
using Btechstore.Services.Impl;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Btechstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IProducto _productoService;
        public ProductoController(IProducto productoService)
        {
            _productoService = productoService;
        }
        // GET: api/<ProductoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<ProductoVista> productos = await _productoService.ConsultarProductos();
            return Ok(productos);
        }
        // POST api/<ProductoController>
        [HttpPost]
        public async Task<IActionResult> Post(ProductoDto producto)
        {
            await _productoService.AgregarProductos(producto);
            return Created();
        }
        // DELETE api/<ProductoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productoService.EliminarProductos(id);
            return Ok();
        }
    }
}
