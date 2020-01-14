import { ClienteService } from './../../../services/cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';
import { FacturaService } from 'src/app/services/factura/factura.service';

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
  id_empleado: any;
  fechaVenta;
  id_cliente;
  id_factura;

  factura;



  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private facturaService: FacturaService) { }

  ngOnInit() {
    // this.getCliente();

    this.id_empleado = localStorage.getItem('id_empleado');
    console.log('user' + this.id_empleado);
  }

  getCliente() {
    this.clienteService.getClienteFac(this.cedula)
      .subscribe(res => {
        this.cliente = res;
        this.mensaje = this.cliente.mensaje;

        console.log(this.mensaje);
        for (let item of this.cliente) {
          this.id_cliente = item.id_cliente;
          this.cedula = item.cedula;
          this.nombre = item.nombre.concat(" " + item.apellido);
          this.direccion = item.direccion;
          this.telefono = item.telefono;
        }
      })
  }

  agregarFactura() {

    var datos = {};
    datos["id_empleado"] = this.id_empleado;
    datos["id_cliente"] = this.id_cliente;
    datos["fecha"] = new Date();
    datos["precio_total"] = this.totalFac;

    console.log("FACTURA" + JSON.stringify(datos));


    this.facturaService.addFactura(datos)
      .subscribe(res => {


        this.factura = res;

        console.log("FACTURA" + JSON.stringify(res));

        this.id_factura = res.id_factura;
        this.guardardetalleFactura(this.id_factura);



      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetalleComponent);
  }

  guardardetalleFactura(idFactura) {

    for (let item of this.detalles) {
      var datos = {};
      datos["id_factura"] = idFactura;
      datos["id_arete"] = item.id_prod;
      datos["cantidad"] = item.cantidad;
      datos["p_unitario"] = item.valor;
      datos["p_total"] = item.valorT;

      console.log("DETALLE" + JSON.stringify(datos));

      this.facturaService.addDetalle(datos)
        .subscribe(
          detalleFactura => console.log('DETALLE AGREGADO: ' + JSON.stringify(detalleFactura))
        );

    }
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
