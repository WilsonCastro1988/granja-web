import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  estaLogueado = false;
  mensaje ;
  token = localStorage.getItem("token");
  username = localStorage.getItem("username");
  nombre = localStorage.getItem("nombre");
  tipo_usuario = localStorage.getItem("tipo_usuario");
  constructor( public router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.verificarSesion();
  }

  verificarSesion(){
    // var token = localStorage.getItem("token");
    if (this.token != null){
      this.estaLogueado = true;
      this.router.navigate(['menu']);

    }else
    this.router.navigate(['login']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
