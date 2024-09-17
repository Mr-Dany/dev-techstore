using System;
using System.Collections.Generic;

namespace Btechstore.Datos;

public partial class Categorium
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<ProductosXcategoria> ProductosXcategoria { get; set; } = new List<ProductosXcategoria>();
}
