import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from 'src/app/model/producto/producto';
import { tap, catchError } from 'rxjs/operators';
import { ProductosVenta } from 'src/app/model/productos_venta/productos-venta';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const Apiurl ="http://localhost:8080/servicio-granja/public/";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productoIdSource = new BehaviorSubject<number>(0);
  productoIdData: any;
  constructor(private http: HttpClient) {
    this.productoIdData = this.productoIdSource.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(Apiurl + "getProductos")
      .pipe(
        tap(heroes => console.log('fetched Producto')),
        catchError(this.handleError('getProductos', []))
      );
  }

  getProducto(id_producto: number): Observable<Producto> {
    const url = `${Apiurl}getProducto/${id_producto}`;
    return this.http.get<Producto>(url).pipe(
      tap(_ => console.log(`fetched Proveedor id_producto=${id_producto}`)),
      catchError(this.handleError<Producto>(`getProveedor id_producto=${id_producto}`))
    );
  }

  addProducto(producto): Observable<Producto> {
    return this.http.post<Producto>(Apiurl + "addProducto", producto, httpOptions).pipe(
      tap((producto: Producto) => console.log(`added producto w/ id_producto=${producto.id_producto}`)),
      catchError(this.handleError<Producto>('addproducto'))
    );
  }

  deleteProducto(id_producto): Observable<Producto> {
    const url = `${Apiurl + "deleteProducto"}/${id_producto}`;
    return this.http.delete<Producto>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted producto id_producto=${id_producto}`)),
      catchError(this.handleError<Producto>('deleteProducto'))
    );
  }

  modificarProducto(producto: any) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateProducto", producto, { headers: header })
  }


  changeProductoId(id_producto: number) {
    this.productoIdSource.next(id_producto);
  }

  // Servicios para actualizar la venta de productos

  addProductoVenta(producto_venta): Observable<ProductosVenta> {
    return this.http.post<ProductosVenta>(Apiurl+"addProductoVenta", producto_venta, httpOptions).pipe(
      tap((cliente: ProductosVenta) => console.log(`added producto_venta w/ id_prod=${producto_venta.id_prod}`)),
      catchError(this.handleError<ProductosVenta>('addProductosVenta'))
    );
  }

  getProductosVenta(): Observable<ProductosVenta[]> {
    return this.http.get<ProductosVenta[]>(Apiurl + "getProductosVenta")
      .pipe(
        tap(heroes => console.log('fetched Producto')),
        catchError(this.handleError('getProductosVenta', []))
      );
  }

  actualizarCantidad(producto_venta: any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateCantidadProducto", producto_venta, { headers: header })
  }

  actualizarPrecio(producto_venta: any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updatePrecioProducto", producto_venta, { headers: header })
  }

}
