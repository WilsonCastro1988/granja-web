import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Factura } from 'src/app/model/factura/factura';
import { Detalleventa } from 'src/app/model/detalleventa/detalleventa';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const Apiurl = "http://localhost/granja-servicio/public/"
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class FacturaService {


  empleadoIdSource = new BehaviorSubject<number>(0);
  empleadoIdData: any;

  constructor(private http: HttpClient) {
    this.empleadoIdData = this.empleadoIdSource.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(Apiurl + "getFacturas")
      .pipe(
        tap(heroes => console.log('fetched facturas')),
        catchError(this.handleError('getFacturas', []))
      );
  }

  getDetalleFacturas(idFactura): Observable<any[]> {
    return this.http.get<any[]>(Apiurl + "getDetalleByFactura/" + idFactura)
      .pipe(
        tap(heroes => console.log('fetched detalles')),
        catchError(this.handleError('getDetalleFacturas', []))
      );
  }




  addFactura(factura): Observable<Factura> {
    return this.http
      .post<Factura>(Apiurl + "addFactura", factura, httpOptions)
      .pipe(
        tap(
          (factura: Factura) => console.log(`added factura w/ id_factura=${factura.id_factura}`)
        ),
        catchError(this.handleError<Factura>('addFactura'))
      );
  }

  addDetalle(detalle): Observable<any> {
    return this.http
      .post<any>(Apiurl + 'addDetalleFactura', detalle, httpOptions)
      .pipe(
        tap(
          (detalle: Detalleventa) => console.log(`detalle aniadido=${detalle.id_detalle}`)
        ),
        catchError(this.handleError<Detalleventa>('addDetalleFactura'))
      );
  }

  deleteFactura(id_factura): Observable<Factura> {
    const url = `${Apiurl + "deleteFactura"}/${id_factura}`;
    return this.http.delete<Factura>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted empleado id_factura=${id_factura}`)),
      catchError(this.handleError<Factura>('deleteFactura'))
    );
  }

  modificarFactura(factura: any) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateFactura", factura, { headers: header })
  }


  changeEmpleadoId(id_factura: number) {
    this.empleadoIdSource.next(id_factura);
  }


}
