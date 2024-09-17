import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../services/producto.service';
import { CategoriasComponent } from '../categorias/categorias.component';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategoriasComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  listProductos: any[] = [];
  listCategorias: any[] = [];
  // Modelo para los elementos seleccionados
  selectedOptions: any[] = [];

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern('^\\d{1,4}(\\.\\d{1,2})?$'), // Solo números decimales con hasta cuatro números enteros y dos decimales
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    
  }
  obtenerProductos() {
    //usamos el servicio de obtener tarjeta y mostramos los datos
    this._productoService.getListProductos().subscribe({
      next: (data) => {
        console.log('lista producto:', data);
        // Procesar datos
        this.listProductos = data;
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejar error
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
      },
    });
  }
  obtenerCategorias() {
    //usamos el servicio de obtener tarjeta y mostramos los datos
    this._categoriaService.getListCategorias().subscribe({
      next: (data) => {
        // Procesar datos
        const nuevasCategorias:any[]=data
        this.listCategorias =  nuevasCategorias.map(({ id, nombre }) => ({ id, nombre }));
        console.log('lista productoo:', this.listCategorias);
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejar error
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
      },
    });
  }
  
  getCategorias(producto: any): string {
    // if (!producto.categoria || !Array.isArray(producto.categoria)) {
    //   return 'No hay categorías';
    // }
    if (producto.categoria.length == 0 ) {
      return '-';
    }
    const productoo:any[]=producto.categoria
    
    return productoo.map((option) => option.nombre).join(', ');
  }


  guardarProducto() {
    const producto: any = {
      producto: {
        nombre: this.form.get('nombre')?.value,
        precio: this.form.get('precio')?.value,
      },
      categoria: this.selectedOptions.map(({ id }) => id)
      
    };
    //usamos el servicio de guardar tarjeta y enviamos la tarjeta y mostramos error o succeso
    this._productoService.saveProducto(producto).subscribe({
      next: (data) => {
        console.log('Next:', data);
        // Procesar datos
        this.toastr.success(
          'El producto fue registrada con exito!',
          'Producto Registrada!'
        );
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejar error
        this.toastr.error(
          'Opss... El producto no ha sido registrada!',
          'Producto NO Registrada!'
        );
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
        this.obtenerProductos();
        this.form.reset();
      },
    });
  }

  eliminarProducto(id: number) {
    console.log();
    //usamos el servicio de eliminar tarjeta y enviamos el ID y mostramos error o succeso
    this._productoService.deleteProducto(id).subscribe({
      next: (data) => {
        //console.log('Next:', data);
        // Procesar datos
        //this._listCategorias = data
        this.toastr.success(
          'El producto fue eliminado con exito!',
          'Producto Eliminado!'
        );
      },
      error: (error) => {
        console.error('Error:', error);
        console.log(error);
        // Manejar error
        this.toastr.error(
          'Opsss... El producto no ha sido eliminado!',
          'Producto NO Eliminado!'
        );
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
        this.obtenerProductos();
      },
    });
  }

  // Método para manejar el cambio en la selección
  onSelectionChange(option: any) {
    console.log(option);
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(
        (item) => item !== option
      );
    } else {
      this.selectedOptions.push(option);
    }
    console.log(this.selectedOptions);
  }

  // Método para obtener las opciones seleccionadas
  getSelectedOptions() {
    return this.selectedOptions.map((option) => option.nombre).join(', ');
  }

  // Método para alternar la visibilidad del dropdown
  toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.classList.toggle('show');
    }
  }
}
