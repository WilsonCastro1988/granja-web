import { BsModalRef } from 'ngx-bootstrap/modal';
import { TipoempleadoService } from './../../../../services/tipoempleado/tipoempleado.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-tipo-empleado',
  templateUrl: './edit-tipo-empleado.component.html',
  styleUrls: ['./edit-tipo-empleado.component.scss']
})
export class EditTipoEmpleadoComponent  {
  id_tipo_usuario:number;
  isLoadingResults = false;
  editTipoUsuarioForm: FormGroup;
  tipoUsuarioData: any;
  event: EventEmitter<any> = new EventEmitter();


  constructor(private tipoUsuarioService: TipoempleadoService, private formBuilder: FormBuilder, private bsModalRef: BsModalRef) { 
    this.editTipoUsuarioForm = this.formBuilder.group({
      tipo_usuario: new FormControl(null, []),
      descripcion: new FormControl('', [])
    }) ;

    this.tipoUsuarioService.tipo_empleadoIdData.subscribe(data => {
      this.id_tipo_usuario = data;
      if (this.id_tipo_usuario !== undefined) {
        this.tipoUsuarioService.getTipoEmpleado(this.id_tipo_usuario).subscribe(data => {
          this.tipoUsuarioData = data;
          console.log(this.tipoUsuarioData);        
          
          if (this.editTipoUsuarioForm!=null && this.tipoUsuarioData!=null) {
            this.editTipoUsuarioForm.controls['tipo_usuario'].setValue(this.tipoUsuarioData.tipo_raza);
            this.editTipoUsuarioForm.controls['descripcion'].setValue(this.tipoUsuarioData.descripcion);
          }
        }, error => { console.log("Error while gettig post details") });
      }
    });
 }

 onTipoUsuarioEditFormSubmit() {
  this.isLoadingResults = true;
  let tipoUsuarioData = {
    'id_tipo_usuario': this.id_tipo_usuario,
    'tipo_usuario': this.editTipoUsuarioForm.get('tipo_usuario').value,
    'descripcion': this.editTipoUsuarioForm.get('descripcion').value,
  };

  this.tipoUsuarioService.modificarTipoEmpleado(tipoUsuarioData).subscribe(data => {       
    this.event.emit('OK');
      this.bsModalRef.hide();   
      this.isLoadingResults = true;   
  });
}

onClose() {
  this.bsModalRef.hide();
}


}
