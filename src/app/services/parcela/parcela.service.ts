import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Parcela } from 'src/app/model/parcela/parcela';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const Apiurl ="http://localhost/granja-servicio/public/"
@Injectable({
  providedIn: 'root'
})

export class ParcelaService {

  parcelaIdSource=new BehaviorSubject<number>(0);
  parcelaIdData: any;
  constructor(private http: HttpClient) {
    this.parcelaIdData = this.parcelaIdSource.asObservable();
   }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getParcelas():Observable<Parcela[]>{
    return this.http.get<Parcela[]>(Apiurl+"getParcelas")
    .pipe(
      tap(heroes => console.log('fetched parcelas')),
      catchError(this.handleError('getParcelas', []))
    );
  }

  getParcela(id_parcela: number): Observable<Parcela> {
    const url = `${Apiurl}getParcela/${id_parcela}`;
    return this.http.get<Parcela>(url).pipe(
      tap(_ => console.log(`fetched Parcela id_parcela=${id_parcela}`)),
      catchError(this.handleError<Parcela>(`getParcela id_parcela=${id_parcela}`))
    );
  }

  addParcela(parcela): Observable<Parcela> {
    return this.http.post<Parcela>(Apiurl+"addParcela", parcela, httpOptions).pipe(
      tap((parcela: Parcela) => console.log(`added parcela w/ id_parcela=${parcela.id_parcela}`)),
      catchError(this.handleError<Parcela>('addParcela'))
    );
  }

  updateParcela(id_parcela, parcela): Observable<any> {
    const url = `${Apiurl+"updateParcela"}/${id_parcela}`;
    return this.http.put(url, parcela, httpOptions).pipe(
      tap(_ => console.log(`updated parcela id=${id_parcela}`)),
      catchError(this.handleError<any>('updateRaza'))
    );
  }

  deleteParcela(id_parcela): Observable<Parcela> {
    const url = `${Apiurl+"deleteParcela"}/${id_parcela}`;
    return this.http.delete<Parcela>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted parcela id_parcela=${id_parcela}`)),
      catchError(this.handleError<Parcela>('deleteParcela'))
    );
  }

  modificarParcela(parcela: any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateParcela", parcela, { headers: header})
}

getParcelaById(id_parcela: number){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get(Apiurl + "getParcela?id_parcela="+ id_parcela, { headers: header})
}

changeParcelaId(id_parcela: number){
    this.parcelaIdSource.next(id_parcela);
}



}
