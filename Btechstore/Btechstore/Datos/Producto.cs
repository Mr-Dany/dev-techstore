using System;
using System.Collections.Generic;

namespace Btechstore.Datos;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public decimal Precio { get; set; }

    public virtual ICollection<ProductosXcategoria> ProductosXcategoria { get; set; } = new List<ProductosXcategoria>();
}
