import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  mensaje = false;
  estaLogueado = false;
  token = localStorage.getItem("token");
  username = localStorage.getItem("username");

  constructor(public authService: AuthService, public router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
  }

  // data = {username: '', password: ''};

  ngOnInit() {
    this.verificarSesion();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  goTo(path): void {
    this.router.navigateByUrl(path);
  }

  verificarSesion() {
    if (this.token != null) {
      this.estaLogueado = true;
      this.router.navigate(['menu']);
    } else
      this.router.navigate(['login']);

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('DATOS DE LOGIN: ' + this.f.username.value + '***' + this.f.password.value);

    try {
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['menu']);

        },
        error => {
          this.router.navigate(['login']);
          this.mensaje = true;
          this.loading = false;
        });
      } catch (error) {
      console.log('error en login: '+error.getMessage());
      }
  }
}
