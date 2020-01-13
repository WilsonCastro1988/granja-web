import { ProvedorService } from './../../../../services/provedor/provedor.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.scss']
})
export class EditProveedorComponent  {
  id_proveedor:number;
  isLoadingResults = false;
  editProveedorForm: FormGroup;
  proveedorData: any;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private bsModalRef: BsModalRef,
    private proveedorService: ProvedorService ) {
      this.editProveedorForm = this.formBuilder.group({
        nombre_proveedor: new FormControl(null, []),
        direccion: new FormControl('', []),
        telefono: new FormControl('', [])
      }) ;
  
      this.proveedorService.proveedorIdData.subscribe(data => {
        this.id_proveedor = data;
        if (this.id_proveedor !== undefined) {
          this.proveedorService.getProveedor(this.id_proveedor).subscribe(data => {
            this.proveedorData = data;
            console.log(this.proveedorData);        
            
            if (this.editProveedorForm!=null && this.proveedorData!=null) {
              this.editProveedorForm.controls['nombre_proveedor'].setValue(this.proveedorData.nombre_proveedor);
              this.editProveedorForm.controls['direccion'].setValue(this.proveedorData.direccion);
              this.editProveedorForm.controls['telefono'].setValue(this.proveedorData.telefono);
            }
          }, error => { console.log("Error while gettig post details") });
        }
      });
   }
  
   onProveedorEditFormSubmit() {
    this.isLoadingResults = true;
    let proveedorData = {
      'id_proveedor': this.id_proveedor,
      'nombre_proveedor': this.editProveedorForm.get('nombre_proveedor').value,
      'direccion': this.editProveedorForm.get('direccion').value,
      'telefono': this.editProveedorForm.get('telefono').value,
    };
  
    this.proveedorService.modificarProveedor(proveedorData).subscribe(data => {       
      this.event.emit('OK');
        this.bsModalRef.hide();   
        this.isLoadingResults = true;   
    });
  }
  
  onClose() {
    this.bsModalRef.hide();
  }

}
