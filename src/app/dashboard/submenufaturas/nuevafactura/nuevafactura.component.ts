import { ClienteService } from './../../../services/cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-nuevafactura',
  templateUrl: './nuevafactura.component.html',
  styleUrls: ['./nuevafactura.component.scss']
})
export class NuevafacturaComponent implements OnInit {

  cedula = "";
  nombre = "";
  direccion = "";
  telefono = "";
  nroFactura = '000123';
  cliente;
  mensaje;
  detalles = [];
  id_prod = "";
  cantidad = 0;
  detalle = "";
  valor = 0;
  totalFac = 0;



  constructor(public dialog: MatDialog, private clienteService: ClienteService) { }

  ngOnInit() {
    // this.getCliente();
  }

  getCliente() {
    this.clienteService.getClienteFac(this.cedula)
      .subscribe(res => {
        this.cliente = res;
        this.mensaje = this.cliente.mensaje;

        console.log(this.mensaje);
        for (let item of this.cliente) {
          this.cedula = item.cedula;
          this.nombre = item.nombre.concat(" " + item.apellido);
          this.direccion = item.direccion;
          this.telefono = item.telefono;
        }
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetalleComponent);
  }

  agregarDetalle() {
    var datos = {};
    datos["id_prod"] = this.id_prod,
      datos["cantidad"] = this.cantidad,
      datos["detalle"] = this.detalle,
      datos["valor"] = this.valor,
      datos["valorT"] = this.cantidad * this.valor;

    var elemento = datos;

    this.detalles.push(elemento);
    var totalFactu = 0;

    for (let item of this.detalles) {
      totalFactu = totalFactu + item.valorT;
      console.log(totalFactu);

    }
    this.totalFac = totalFactu;
  }

  removeItem(item) {
    var i = item;

    if (i !== -1) {
      this.detalles.splice(i, 1);
    }
    var totalFactu = 0;

    for (let item of this.detalles) {
      totalFactu = totalFactu + item.valorT;
      console.log(totalFactu);

    }
    this.totalFac = totalFactu;
  }

}
