import { Component } from '@angular/core';

import { CategoriaService } from '../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  listCategorias: any[] = [];
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      //productosXcategoria:[]
    });
  }
  ngOnInit(): void {
    this.obtenerCategorias();
  }
  obtenerCategorias() {
    //usamos el servicio de obtener tarjeta y mostramos los datos
    this._categoriaService.getListCategorias().subscribe({
      next: (data) => {
        console.log('lista categoria:', data);
        // Procesar datos
        this.listCategorias = data;
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

  //funcion que se activa al presionar boton guardar
  //guarda datos que vienen del formulario en la constante Tarjeta
  guardarCategoria() {
    const categoria: any = {
      nombre: this.form.get('nombre')?.value
    };
    //usamos el servicio de guardar tarjeta y enviamos la tarjeta y mostramos error o succeso
    this._categoriaService.saveCategoria(categoria).subscribe({
      next: (data) => {
        console.log('Next:', data);
        // Procesar datos
        this.toastr.success(
          'La categoria fue registrada con exito!',
          'Categoria Registrada!'
        );
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejar error
        this.toastr.error(
          'Opss... La categoria no ha sido registrada!',
          'Categoria NO Registrada!'
        );
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
        this.obtenerCategorias();
        this.form.reset();
      },
    });
  }
  //metodo pra eliminar una tarjeta mediante el id
  eliminarCategoria(id: number) {
    //usamos el servicio de eliminar tarjeta y enviamos el ID y mostramos error o succeso
    this._categoriaService.deleteCategoria(id).subscribe({
      next: (data) => {
        //console.log('Next:', data);
        // Procesar datos
        //this._listCategorias = data
        this.toastr.success(
          'La categoria fue eliminada con exito!',
          'Categoria Eliminada!'
        );
      },
      error: (error) => {
        console.error('Error:', error);
        console.log(error)
        // Manejar error
        this.toastr.error(
          'Opsss... La categoria no ha sido eliminada!',
          'Categoria NO Eliminada!'
        );
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
        this.obtenerCategorias();
      },
    });
  }
}
