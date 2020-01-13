import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProvedorService } from 'src/app/services/provedor/provedor.service';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent{
  id_producto: number;
  proveedores: any[] = [];
  isLoadingResults = false;
  editProductoForm: FormGroup;
  productoData: any;
  event: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, public proveedorService: ProvedorService, private productoService: ProductoService,
    private formBuilder: FormBuilder, private bsModalRef: BsModalRef) {
    this.editProductoForm = this.formBuilder.group({
      id_producto: new FormControl(null, []),
      id_proveedor: new FormControl('', []),
      nombre: new FormControl('', []),
      cantidad: new FormControl('', []),
      precio: new FormControl('', []),
      presentacion: new FormControl('', [])
    });


    this.proveedorService.getProveedores().subscribe(data => {
      Object.assign(this.proveedores, data);
    }, error => { console.log('Error while gettig tipo_producto data.'); });

    this.productoService.productoIdData.subscribe(data => {
      this.id_producto = data;
      if (this.id_producto !== undefined) {
        this.productoService.getProducto(this.id_producto).subscribe(data => {
          this.productoData = data;
          console.log(this.productoData);

          if (this.editProductoForm != null && this.productoData != null) {
            this.editProductoForm.controls['id_proveedor'].setValue(this.productoData.id_proveedor);
            this.editProductoForm.controls['nombre'].setValue(this.productoData.nombre);
            this.editProductoForm.controls['cantidad'].setValue(this.productoData.cantidad);
            this.editProductoForm.controls['precio'].setValue(this.productoData.precio)
            this.editProductoForm.controls['presentacion'].setValue(this.productoData.presentacion);
          }
        }, error => { console.log("Error while gettig post details") });
      }
    });
  }

  onEditProductoFormSubmit() {
    this.isLoadingResults = true;
    let productoData = {
      'id_producto': this.id_producto,
      'id_proveedor': this.editProductoForm.get('id_proveedor').value,
      'nombre': this.editProductoForm.get('nombre').value,
      'cantidad': this.editProductoForm.get('cantidad').value,
      'precio': this.editProductoForm.get('precio').value,
      'presentacion': this.editProductoForm.get('presentacion').value
    };

    this.productoService.modificarProducto(productoData).subscribe(data => {
      this.event.emit('OK');
      this.bsModalRef.hide();
      this.isLoadingResults = true;
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
