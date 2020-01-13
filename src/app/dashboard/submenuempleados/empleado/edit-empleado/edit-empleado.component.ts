import { TipoempleadoService } from './../../../../services/tipoempleado/tipoempleado.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent {
  id_empleado: number;
  tipos: any[] = [];
  isLoadingResults = false;
  editEmpleadoForm: FormGroup;
  empleadoData: any;
  event: EventEmitter<any> = new EventEmitter();


  constructor(public dialog: MatDialog, public tipoEmpleado: TipoempleadoService, private empleadoService: EmpleadoService, 
    private formBuilder: FormBuilder, private bsModalRef: BsModalRef) {
    this.editEmpleadoForm = this.formBuilder.group({
      id_tipo_usuario: new FormControl(null, []),
      nombre: new FormControl('', []),
      apellido: new FormControl('', []),
      cedula: new FormControl('', []),
      telefono: new FormControl('', []),
      sueldo: new FormControl('', []),
      horas_extras: new FormControl('', []),
      costo_hora: new FormControl('', []),
      username: new FormControl('', []),
      pass: new FormControl('', [])
    });


    this.tipoEmpleado.getTipoEmpleados().subscribe(data => {
      Object.assign(this.tipos, data);
    }, error => { console.log('Error while gettig tipo_empleado data.'); });

    this.empleadoService.empleadoIdData.subscribe(data => {
      this.id_empleado = data;
      if (this.id_empleado !== undefined) {
        this.empleadoService.getEmpleado(this.id_empleado).subscribe(data => {
          this.empleadoData = data;
          console.log(this.empleadoData);

          if (this.editEmpleadoForm != null && this.empleadoData != null) {
            this.editEmpleadoForm.controls['id_tipo_usuario'].setValue(this.empleadoData.id_tipo_usuario);
            this.editEmpleadoForm.controls['cedula'].setValue(this.empleadoData.cedula);
            this.editEmpleadoForm.controls['nombre'].setValue(this.empleadoData.nombre);
            this.editEmpleadoForm.controls['apellido'].setValue(this.empleadoData.apellido)
            this.editEmpleadoForm.controls['telefono'].setValue(this.empleadoData.telefono);
            this.editEmpleadoForm.controls['sueldo'].setValue(this.empleadoData.sueldo);
            this.editEmpleadoForm.controls['horas_extras'].setValue(this.empleadoData.horas_extras);
            this.editEmpleadoForm.controls['costo_hora'].setValue(this.empleadoData.costo_hora),
            this.editEmpleadoForm.controls['username'].setValue(this.empleadoData.username);
            this.editEmpleadoForm.controls['pass'].setValue(this.empleadoData.pass)
          }
        }, error => { console.log("Error while gettig post details") });
      }
    });
  }

  onEditEmpleadoFormSubmit() {
    this.isLoadingResults = true;
    let empleadoData = {
      'id_empleado': this.id_empleado,
      'id_tipo_usuario': this.editEmpleadoForm.get('id_tipo_usuario').value,
      'cedula': this.editEmpleadoForm.get('cedula').value,
      'nombre': this.editEmpleadoForm.get('nombre').value,
      'apellido': this.editEmpleadoForm.get('apellido').value,
      'telefono': this.editEmpleadoForm.get('telefono').value,
      'sueldo': this.editEmpleadoForm.get('sueldo').value,
      'horas_extras': this.editEmpleadoForm.get('horas_extras').value,
      'costo_hora': this.editEmpleadoForm.get('costo_hora').value,
      'username': this.editEmpleadoForm.get('username').value,
      'pass': this.editEmpleadoForm.get('pass').value,
    };

    this.empleadoService.modificarEmpleado(empleadoData).subscribe(data => {
      this.event.emit('OK');
      this.bsModalRef.hide();
      this.isLoadingResults = true;
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
