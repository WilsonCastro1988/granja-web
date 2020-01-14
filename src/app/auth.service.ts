import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost/granja-servicio/public/login';

    constructor(private http: HttpClient, private router: Router) {
    }

    login(username: string, password: string) {
      return this.http.post<any>(this.url, { username: username, password: password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                console.log('DATOS LLENOS');
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('token', user.token);
                  localStorage.setItem('username', user.username);
                  localStorage.setItem('tipo_usuario', user.id_tipo_usuario);
                  var nombre = user.nombre.concat(" "+ user.apellido);
                  localStorage.setItem('nombre', nombre);
              }
              this.router.navigateByUrl('/menu')

              return user;
          }));

  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('nombre');
      localStorage.removeItem('tipo_usuario');
  }

    private save_token(data) {
        if (data.success) {
            localStorage.setItem('token', data.token);
            return;
        }
    }
}
