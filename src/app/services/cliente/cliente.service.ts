import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Cliente } from './../../model/cliente';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const Apiurl ="http://localhost/granja-servicio/public/"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteIdSource = new  BehaviorSubject<number>(0);
  clienteIdData: any;

  constructor(private http: HttpClient) {
    this.clienteIdData= this.clienteIdSource.asObservable();
   }

  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(Apiurl+"getClientes")
      .pipe(
        tap(heroes => console.log('fetched Clientes')),
        catchError(this.handleError('getCliente', []))
      );
  }

  getCliente(id_cliente: number): Observable<Cliente> {
    const url = `${Apiurl}getCliente/${id_cliente}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetched Cliente id_cliente=${id_cliente}`)),
      catchError(this.handleError<Cliente>(`getCliente id_cliente=${id_cliente}`))
    );
  }

  getClienteFac(cedula: string): Observable<Cliente> {
    const url = `${Apiurl}getClient/${cedula}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetched Cliente cedula=${cedula}`)),
      catchError(this.handleError<Cliente>(`getCliente cedula=${cedula}`))
    );
  }

  addCliente(cliente): Observable<Cliente> {
    return this.http.post<Cliente>(Apiurl+"addCliente", cliente, httpOptions).pipe(
      tap((cliente: Cliente) => console.log(`added cliente w/ id_cliente=${cliente.id_cliente}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  updateCliente(id_cliente, cliente): Observable<any> {
    const url = `${Apiurl+"updateCliente"}/${id_cliente}`;
    return this.http.put(url, cliente, httpOptions).pipe(
      tap(_ => console.log(`updated cliente id=${id_cliente}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  deleteCliente(id_cliente): Observable<Cliente> {
    const url = `${Apiurl+"deleteCliente"}/${id_cliente}`;
    return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cliente id_cliente=${id_cliente}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  modificarCliente(cliente: any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.post(Apiurl + "updateCliente", cliente, { headers: header})
}

getClienteById(id_cliente: number){
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get(Apiurl + "getCliente?id_cliente="+ id_cliente, { headers: header})
}

changeClienteId(id_cliente: number){
    this.clienteIdSource.next(id_cliente);
}


}
