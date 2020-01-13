import { Component, OnInit } from '@angular/core';
import { RazaService } from 'src/app/services/raza/raza.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Raza } from 'src/app/model/raza/raza';

@Component({
  selector: 'app-razadetalle',
  templateUrl: './razadetalle.component.html',
  styleUrls: ['./razadetalle.component.scss']
})
export class RazadetalleComponent implements OnInit {

  raza: Raza = { id_raza: 0 , tipo_raza: '', descripcion: '', updated_at: null };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: RazaService, private router: Router) { }

  ngOnInit() {
    this.getRazaDetails(this.route.snapshot.params['id_raza']);
  }

  getRazaDetails(id_raza) {
    this.api.getRaza(id_raza)
    .subscribe(data => {
      this.raza = data;
      console.log(this.raza);
      this.isLoadingResults = false;
    });
  }

  deleteRaza(id_raza) {
    this.isLoadingResults = true;
    this.api.deleteRaza(id_raza)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/raza']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
