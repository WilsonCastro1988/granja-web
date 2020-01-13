import { Animal } from './../../model/animal/animal';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const Apiurl ="http://localhost:8080/servicio-granja/public/"
@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  animalIdSource = new  BehaviorSubject<number>(0);
  animalIdData: any;
  constructor(private http: HttpClient) {
    this.animalIdData = this.animalIdSource.asObservable();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getAnimales(): Observable<Animal[]> {
    return this.http.get<Animal[]>(Apiurl+"getAnimales")
      .pipe(
        tap(heroes => console.log('fetched Animales')),
        catchError(this.handleError('getAnimal', []))
      );
  }

  addAnimal(animal): Observable<Animal> {
    return this.http.post<Animal>(Apiurl+"addAnimal", animal, httpOptions).pipe(
      tap((animal: Animal) => console.log(`added animal w/ id_animal=${animal.id_animal}`)),
      catchError(this.handleError<Animal>('addAnimal'))
    );
  }

}
