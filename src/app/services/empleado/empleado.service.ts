import { Empleado } from './../../model/empleado/empleado';
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

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
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

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(Apiurl + "getEmpleados")
      .pipe(
        tap(heroes => console.log('fetched Empleado')),
        catchError(this.handleError('getEmpleados', []))
      );
  }

  getEmpleado(id_empleado: number): Observable<Empleado> {
    const url = `${Apiurl}getEmpleado/${id_empleado}`;
    return this.http.get<Empleado>(url).pipe(
      tap(_ => console.log(`fetched Empleado id_empleado=${id_empleado}`)),
      catchError(this.handleError<Empleado>(`getEmpleado id_empleado=${id_empleado}`))
    );
  }

  addEmpleado(empleado): Observable<Empleado> {
    return this.http.post<Empleado>(Apiurl + "addEmpleado", empleado, httpOptions).pipe(
      tap((empleado: Empleado) => console.log(`added empleado w/ id_empleado=${empleado.id_empleado}`)),
      catchError(this.handleError<Empleado>('addEmpleado'))
    );
  }

  deleteEmpleado(id_empleado): Observable<Empleado> {
    const url = `${Apiurl + "deleteEmpleado"}/${id_empleado}`;
    return this.http.delete<Empleado>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted empleado id_empleado=${id_empleado}`)),
      catchError(this.handleError<Empleado>('deleteEmpleado'))
    );
  }

  modificarEmpleado(empleado: any) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateEmpleado", empleado, { headers: header })
  }


  changeEmpleadoId(id_empleado: number) {
    this.empleadoIdSource.next(id_empleado);
  }

}
