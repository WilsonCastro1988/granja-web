import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Raza } from 'src/app/model/raza/raza';
import { BehaviorSubject } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const Apiurl = 'http://localhost:8080/servicio-granja/public/';

@Injectable({
  providedIn: 'root'
})
export class RazaService {
    razaIdSource = new  BehaviorSubject<number>(0);
    razaIdData: any;

  constructor(private http: HttpClient) {
    this.razaIdData= this.razaIdSource.asObservable();
   }

  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}

  getRazas(): Observable<Raza[]> {
    return this.http.get<Raza[]>(Apiurl+"getRazas")
      .pipe(
        tap(heroes => console.log('fetched razas')),
        catchError(this.handleError('getRaza', []))
      );
  }

  getRaza(id_raza: number): Observable<Raza> {
    const url = `${Apiurl}getRaza/${id_raza}`;
    return this.http.get<Raza>(url).pipe(
      tap(_ => console.log(`fetched Raza id_raza=${id_raza}`)),
      catchError(this.handleError<Raza>(`getRaza id_raza=${id_raza}`))
    );
  }

  addRaza(raza): Observable<Raza> {
    return this.http.post<Raza>(Apiurl+"addRaza", raza, httpOptions).pipe(
      tap((raza: Raza) => console.log(`added raza w/ id_raza=${raza.id_raza}`)),
      catchError(this.handleError<Raza>('addRaza'))
    );
  }

  updateRaza(id_raza, raza): Observable<any> {
    const url = `${Apiurl+"updateRaza"}/${id_raza}`;
    return this.http.put(url, raza, httpOptions).pipe(
      tap(_ => console.log(`updated raza id=${id_raza}`)),
      catchError(this.handleError<any>('updateRaza'))
    );
  }

  deleteRaza(id_raza): Observable<Raza> {
    const url = `${Apiurl+"deleteRaza"}/${id_raza}`;
    return this.http.delete<Raza>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted raza id_raza=${id_raza}`)),
      catchError(this.handleError<Raza>('deleteRaza'))
    );
  }

  modificarRaza(raza: any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateRaza", raza, { headers: header})
}

getRazaById(id_raza: number){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get(Apiurl + "getRaza?id_raza="+ id_raza, { headers: header})
}

changeRazaId(id_raza: number){
    this.razaIdSource.next(id_raza);
}
}
