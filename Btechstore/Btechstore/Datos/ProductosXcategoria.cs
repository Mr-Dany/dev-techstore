using System;
using System.Collections.Generic;

namespace Btechstore.Datos;

public partial class ProductosXcategoria
{
    public int Id { get; set; }

    public int CategoriaId { get; set; }

    public int ProductoId { get; set; }

    public virtual Categorium Categoria { get; set; } = null!;

    public virtual Producto Producto { get; set; } = null!;
}
