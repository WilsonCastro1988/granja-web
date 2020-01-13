import { Component, OnInit } from '@angular/core';
import { Raza } from 'src/app/model/raza/raza';
import { RazaService } from 'src/app/services/raza/raza.service';

@Component({
  selector: 'app-razalist',
  templateUrl: './razalist.component.html',
  styleUrls: ['./razalist.component.scss']
})
export class RazalistComponent implements OnInit {

  displayedColumns: string[] = ['tipo_raza', 'descripcion'];
  data: Raza[] = [];
  isLoadingResults = true;
  constructor(public razaService:RazaService) { }

  ngOnInit() {
    this.razaService.getRazas()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
