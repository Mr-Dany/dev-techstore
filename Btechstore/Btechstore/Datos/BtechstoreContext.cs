using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Btechstore.Datos;

public partial class BtechstoreContext : DbContext
{
    public BtechstoreContext()
    {
    }

    public BtechstoreContext(DbContextOptions<BtechstoreContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categorium> Categoria { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<ProductosXcategoria> ProductosXcategorias { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-V6UNN9C\\SQLEXPRESS; DataBase=Btechstore; Trusted_Connection=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categorium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC07C265D055");

            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3214EC071AD988A0");

            entity.ToTable("Producto");

            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Precio).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<ProductosXcategoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3214EC0701DB7364");

            entity.ToTable("ProductosXCategorias");

            entity.HasOne(d => d.Categoria).WithMany(p => p.ProductosXcategoria)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductosXCategorias_Categoria");

            entity.HasOne(d => d.Producto).WithMany(p => p.ProductosXcategoria)
                .HasForeignKey(d => d.ProductoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductosXCategorias_Producto");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
