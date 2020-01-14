import { Proveedor } from './../../model/proveedor/proveedor';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const Apiurl ="http://localhost/granja-servicio/public/"

@Injectable({
  providedIn: 'root'
})
export class ProvedorService {
  proveedorIdSource = new BehaviorSubject<number>(0);
  proveedorIdData: any;
  constructor(private http: HttpClient) {
    this.proveedorIdData = this.proveedorIdSource.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(Apiurl + "getProveedores")
      .pipe(
        tap(heroes => console.log('fetched Proveedor')),
        catchError(this.handleError('getProveedores', []))
      );
  }

  getProveedor(id_proveedor: number): Observable<Proveedor> {
    const url = `${Apiurl}getProveedor/${id_proveedor}`;
    return this.http.get<Proveedor>(url).pipe(
      tap(_ => console.log(`fetched Proveedor id_proveedor=${id_proveedor}`)),
      catchError(this.handleError<Proveedor>(`getProveedor id_proveedor=${id_proveedor}`))
    );
  }

  addProveedor(proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(Apiurl + "addProveedor", proveedor, httpOptions).pipe(
      tap((proveedor: Proveedor) => console.log(`added proveedor w/ id_proveedor=${proveedor.id_proveedor}`)),
      catchError(this.handleError<Proveedor>('addproveedor'))
    );
  }

  deleteProveedor(id_proveedor): Observable<Proveedor> {
    const url = `${Apiurl + "deleteProveedor"}/${id_proveedor}`;
    return this.http.delete<Proveedor>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted proveedor id_proveedor=${id_proveedor}`)),
      catchError(this.handleError<Proveedor>('deleteProveedor'))
    );
  }

  modificarProveedor(proveedor: any) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateProveedor", proveedor, { headers: header })
  }


  changeProveedorId(id_proveedor: number) {
    this.proveedorIdSource.next(id_proveedor);
  }


}

