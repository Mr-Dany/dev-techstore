using Btechstore.Datos;
using Btechstore.Models;
using Btechstore.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Btechstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoria _categoriaService;
        public CategoriaController(ICategoria categoriaService)
        {
            _categoriaService = categoriaService;   
        }
        // GET: api/<CategoriaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Categorium> categorias = await _categoriaService.ConsultarCategorias();
            return Ok(categorias);
        }
        // POST api/<CategoriaController>
        [HttpPost]
        public async Task<IActionResult> Post(string nombre)
        {
            await _categoriaService.AgregarCategorias(nombre);
            return Created();
        }
        // DELETE api/<CategoriaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoriaService.EliminarCategorias(id);
            return Ok();
        }
    }
}
