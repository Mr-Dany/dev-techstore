import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private myAppUrl = 'https://localhost:7262/';
  private myApiUrl = 'api/Producto/';

  constructor(private http: HttpClient) {}
  //metodo para hacer peticion al backend y obtener lista de tarjetas
  getListProductos(): Observable<any> {
    //hacemos la peticion envindole la url mediante nuestra variables
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  //metodo para hacer una solicitud al backend y eliminar tarjeta
  deleteProducto(id: number): Observable<any> {
    //hacemos la peticion enviandole la url y el id mediante nuestras variables
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  //metodo para hacer una solicitud al backend y agregar nueva tarjeta
  saveProducto(producto: any): Observable<any> {
    //hacemos la peticion enviandole la url y la tarjeta a guardar mediante nuestras variables
    return this.http.post(this.myAppUrl + this.myApiUrl, producto);
    
    
  }
}
