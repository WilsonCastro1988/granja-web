import { EmpleadoService } from './../../../services/empleado/empleado.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Empleado } from 'src/app/model/empleado/empleado';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EditEmpleadoComponent } from './edit-empleado/edit-empleado.component';
import { TipoempleadoService } from 'src/app/services/tipoempleado/tipoempleado.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Empleado[] = [];
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'id_tipo_usuario', 'telefono', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isLoadingResults = true;
  empleadoForm: FormGroup;
  p: number = 1;
  empleado: Empleado = { id_empleado:0, id_tipo_usuario: 0, cedula: '', nombre: '', apellido: '', telefono: '', sueldo: 0, horas_extras: 0, costo_hora: 0, username:'', password:''};
  dataTipos;
  bsModalRef: BsModalRef;
  constructor(public dialog: MatDialog,public empleadoService: EmpleadoService,  private formBuilder: FormBuilder,
    private bsModalService: BsModalService, private tipoEmpleadoService: TipoempleadoService) {
      this.empleadoForm = this.formBuilder.group({
        'id_tipo_usuario' : [null, Validators.required],
        'cedula' : ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
        'nombre' : [null, Validators.required],
        'apellido' : [null, Validators.required],
        'telefono' : [null, Validators.required],
        'username':[null],
        'password':[null]
      });
    }

  ngOnInit() {
    this.getEmpleados();
    this.getTipos();
  }

  getTipos(){
    this.tipoEmpleadoService.getTipoEmpleados()
    .subscribe(res => {
      this.dataTipos = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onload(){
    this.empleadoService.getEmpleados()
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
    this.empleadoService.addEmpleado(form)
      .subscribe(res => {
          let id_empleado = res['id_empleado'];
          this.isLoadingResults = false;
          this.onload();
          this.empleadoForm.reset();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getEmpleados(){
    this.empleadoService.getEmpleados()
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


  deleteEmpleado(id_empleado) {
    this.isLoadingResults = true;
    var r = confirm("Seguro desea eliminar!");
    if (r == true) {
      this.empleadoService.deleteEmpleado(id_empleado)
      .subscribe(res => {
      this.isLoadingResults = false;
        this.onload();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    } else {
      console.log('Cancelar');

    }

}

editEmpleado(id_empleado: number) {
  this.empleadoService.changeEmpleadoId(id_empleado);
  this.bsModalRef = this.bsModalService.show(EditEmpleadoComponent);
  this.bsModalRef.content.event.subscribe(result => {
    if (result == 'OK') {
      setTimeout(() => {
        this.isLoadingResults = false;
        this.getEmpleados();
      }, 5000);
    }
  });
}

}
