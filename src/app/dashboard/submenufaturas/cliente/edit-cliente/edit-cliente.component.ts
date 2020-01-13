import { ClienteService } from './../../../../services/cliente/cliente.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {
  id_cliente:number;
  isLoadingResults = false;
  editClienteForm: FormGroup;
  clienteData: any;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private api: ClienteService, private formBuilder: FormBuilder, private bsModalRef: BsModalRef) {
    this.editClienteForm = this.formBuilder.group({
      cedula: new FormControl('', []),
      nombre: new FormControl('', []),
      apellido: new FormControl('', []),
      direccion: new FormControl('', []),
      telefono: new FormControl('', [])
    }) ;

    this.api.clienteIdData.subscribe(data => {
      this.id_cliente = data;
      if (this.id_cliente !== undefined) {
        this.api.getCliente(this.id_cliente).subscribe(data => {
          this.clienteData = data;
          console.log(this.clienteData);
          
          
          if (this.editClienteForm!=null && this.clienteData!=null) {
            this.editClienteForm.controls['cedula'].setValue(this.clienteData.cedula);
            this.editClienteForm.controls['nombre'].setValue(this.clienteData.nombre);
            this.editClienteForm.controls['apellido'].setValue(this.clienteData.apellido);
            this.editClienteForm.controls['direccion'].setValue(this.clienteData.direccion);
            this.editClienteForm.controls['telefono'].setValue(this.clienteData.telefono);
            
          }
        }, error => { console.log("Error while gettig post details") });
      }
    });
   }

  ngOnInit() {
  }

  onClienteEditFormSubmit() {
    let clienteData = {
      'id_cliente': this.id_cliente,
      'cedula': this.editClienteForm.get('cedula').value,
      'nombre': this.editClienteForm.get('nombre').value,
      'apellido': this.editClienteForm.get('apellido').value,
      'direccion': this.editClienteForm.get('direccion').value,
      'telefono': this.editClienteForm.get('telefono').value,
    };

    this.api.modificarCliente(clienteData).subscribe(data => {      
        this.event.emit('OK');
        this.bsModalRef.hide();      
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }


}
