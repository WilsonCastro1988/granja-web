import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tipoempleado } from './../../../model/tipoempleado/tipoempleado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TipoempleadoService } from 'src/app/services/tipoempleado/tipoempleado.service';
import { EditTipoEmpleadoComponent } from '../tipoEmpleado/edit-tipo-empleado/edit-tipo-empleado.component';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-tipo-empleado',
  templateUrl: './tipo-empleado.component.html',
  styleUrls: ['./tipo-empleado.component.scss']
})
export class TipoEmpleadoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Tipoempleado[] = [];
  displayedColumns: string[] = ['id_tipo_usuario', 'tipo_usuario', 'descripcion', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isLoadingResults = true;
  tipousuarioForm: FormGroup;
  p: number = 1;
  tipoempleado: Tipoempleado = { id_tipo_usuario: 0, tipo_usuario: '', descripcion: ''};
  tipousuarioList: any[] = [];
  bsModalRef: BsModalRef;

  constructor(public dialog: MatDialog,
    public tipoEmpleadoService: TipoempleadoService,  private formBuilder: FormBuilder,
    private bsModalService: BsModalService) {
      this.tipousuarioForm = this.formBuilder.group({
        'tipo_usuario' : [null, Validators.required],
        'descripcion' : [null, Validators.required],
      });
     }

  ngOnInit() {
    this.getTipoEmpleados();
  }

  onload(){
    this.tipoEmpleadoService.getTipoEmpleados()
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.tipoEmpleadoService.addTipoEmpleado(form)
      .subscribe(res => {
          let id_tipo_usuario = res['id_tipo_usuario'];
          this.isLoadingResults = false;
          this.onload();
          this.tipousuarioForm.reset();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getTipoEmpleados(){
    this.tipoEmpleadoService.getTipoEmpleados()
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


  deleteTipoEmpleado(id_tipo_usuario) {
    this.isLoadingResults = true;
    this.tipoEmpleadoService.deleteTipoEmpleado(id_tipo_usuario)
    .subscribe(res => {
      this.isLoadingResults = false;
        this.onload();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}

editTipoEmpleado(id_tipo_usuario: number) {
  this.tipoEmpleadoService.changeTipoEmpleadoId(id_tipo_usuario);

  this.bsModalRef = this.bsModalService.show(EditTipoEmpleadoComponent);
  this.bsModalRef.content.event.subscribe(result => {
    if (result == 'OK') {
      setTimeout(() => {
        this.getTipoEmpleados();
      }, 5000);
    }
  });
}

}
