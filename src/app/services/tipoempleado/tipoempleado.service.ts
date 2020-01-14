import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tipoempleado } from 'src/app/model/tipoempleado/tipoempleado';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const Apiurl ="http://localhost/granja-servicio/public/"
@Injectable({
  providedIn: 'root'
})

export class TipoempleadoService {
  tipo_empleadoIdSource = new  BehaviorSubject<number>(0);
    tipo_empleadoIdData: any;

  constructor(private http: HttpClient) {
    this.tipo_empleadoIdData = this.tipo_empleadoIdSource.asObservable();
   }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getTipoEmpleados(): Observable<Tipoempleado[]> {
    return this.http.get<Tipoempleado[]>(Apiurl+"getTipoEmpleados")
      .pipe(
        tap(heroes => console.log('fetched tipoEmpleado')),
        catchError(this.handleError('getTipoEmpleado', []))
      );
  }

  getTipoEmpleado(id_tipo_usuario: number): Observable<Tipoempleado> {
    const url = `${Apiurl}getTipoEmpleado/${id_tipo_usuario}`;
    return this.http.get<Tipoempleado>(url).pipe(
      tap(_ => console.log(`fetched Empleado id_tipo_usuario=${id_tipo_usuario}`)),
      catchError(this.handleError<Tipoempleado>(`getTipoEmpleado id_tipo_usuario=${id_tipo_usuario}`))
    );
  }

  addTipoEmpleado(tipoempleado): Observable<Tipoempleado> {
    return this.http.post<Tipoempleado>(Apiurl+"addTipoEmpleado", tipoempleado, httpOptions).pipe(
      tap((tipoempleado: Tipoempleado) => console.log(`added tipoempleado w/ id_tipo_usuario=${tipoempleado.id_tipo_usuario}`)),
      catchError(this.handleError<Tipoempleado>('addTipoEMpleado'))
    );
  }

  // updateRaza(id_tipo_usuario, raza): Observable<any> {
  //   const url = `${Apiurl+"updateRaza"}/${id_tipo_usuario}`;
  //   return this.http.put(url, raza, httpOptions).pipe(
  //     tap(_ => console.log(`updated raza id=${id_tipo_usuario}`)),
  //     catchError(this.handleError<any>('updateRaza'))
  //   );
  // }

  deleteTipoEmpleado(id_tipo_usuario): Observable<Tipoempleado> {
    const url = `${Apiurl+"deleteTipoEmpleado"}/${id_tipo_usuario}`;
    return this.http.delete<Tipoempleado>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted tipoempleado id_tipo_usuario=${id_tipo_usuario}`)),
      catchError(this.handleError<Tipoempleado>('deleteTipoUsuario'))
    );
  }

  modificarTipoEmpleado(tipoempleado: any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateTipoEmpleado", tipoempleado, { headers: header})
}

getTipoEmpleadoById(id_tipo_usuario: number){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get(Apiurl + "getTipoEmpleado?id_tipo_usuario="+ id_tipo_usuario, { headers: header})
}

changeTipoEmpleadoId(id_tipo_usuario: number){
    this.tipo_empleadoIdSource.next(id_tipo_usuario);
}


}
