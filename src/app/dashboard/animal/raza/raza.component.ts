import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RazaService } from 'src/app/services/raza/raza.service';
import { Raza } from 'src/app/model/raza/raza';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import swal from'sweetalert2';
import { RazaeditComponent } from './razaedit/razaedit.component';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.scss']
})
export class RazaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Raza[] = [];
  displayedColumns: string[] = ['id_parcela', 'lugar', 'descripcion', 'opciones'];
    dataSource;

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  isLoadingResults = true;
  razaForm: FormGroup;
  p: number = 1;
  raza: Raza = { id_raza: 0, tipo_raza: '', descripcion: '', updated_at: null };
  razaList: any[] = [];
  bsModalRef: BsModalRef;


  constructor(private route: ActivatedRoute,
    public dialog: MatDialog, private router: Router,
    public razaService: RazaService,  private formBuilder: FormBuilder,
    private bsModalService: BsModalService) {
    this.razaForm = this.formBuilder.group({
      'tipo_raza' : [null, Validators.required],
      'descripcion' : [null, Validators.required],
    });
   }

  ngOnInit() {
    this.getRazas();
  }

  onload(){
    this.razaService.getRazas()
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.razaService.addRaza(form)
      .subscribe(res => {
          let id_raza = res['_id_raza'];
          this.isLoadingResults = false;
          this.onload();
          this.razaForm.reset();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getRazas(){
    this.razaService.getRazas()
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }


  deleteRaza(id_raza) {
    this.isLoadingResults = true;
    this.razaService.deleteRaza(id_raza)
    .subscribe(res => {
      this.isLoadingResults = false;
        this.onload();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}



editRaza(id_raza: number) {
  this.razaService.changeRazaId(id_raza);

  this.bsModalRef = this.bsModalService.show(RazaeditComponent);
  this.bsModalRef.content.event.subscribe(result => {
    if (result == 'OK') {
      setTimeout(() => {
        this.getRazas();
      }, 5000);
    }
  });
}

}
