import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private myAppUrl = 'https://localhost:7262/';
  private myApiUrl = 'api/Categoria/';

  constructor(private http: HttpClient) {}
  //metodo para hacer peticion al backend y obtener lista de tarjetas
  getListCategorias(): Observable<any> {
    //hacemos la peticion envindole la url mediante nuestra variables
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  //metodo para hacer una solicitud al backend y eliminar tarjeta
  deleteCategoria(id: number): Observable<any> {
    //hacemos la peticion enviandole la url y el id mediante nuestras variables
    return this.http.delete(this.myAppUrl + this.myApiUrl + id, {});
  }
  //metodo para hacer una solicitud al backend y agregar nueva tarjeta
  saveCategoria(categoria: any): Observable<any> {
    //hacemos la peticion enviandole la url y la tarjeta a guardar mediante nuestras variables
    return this.http.post(this.myAppUrl + this.myApiUrl+ "?nombre="+ categoria.nombre, {});
  }
}
