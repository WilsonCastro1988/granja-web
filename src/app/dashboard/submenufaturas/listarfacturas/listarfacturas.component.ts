import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FacturaService } from 'src/app/services/factura/factura.service';

@Component({
  selector: 'app-listarfacturas',
  templateUrl: './listarfacturas.component.html',
  styleUrls: ['./listarfacturas.component.scss']
})
export class ListarfacturasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id_factura', 'id_cliente', 'valor', 'estado', 'detalles'];
  displayedColumnsDetalle: string[] = ['id_detalle', 'id_factura', 'id_arete', 'descripcion', 'cantidad', 'p_unitario', 'p_total'];
  dataSource;
  dataSourceDetalle;
  isLoadingResults = true;
  idFactura;


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.facturaService.getFacturas()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  verDetalle(idFactura) {
    this.idFactura = idFactura;
    this.facturaService.getDetalleFacturas(idFactura)
      .subscribe(res => {
        this.dataSourceDetalle = new MatTableDataSource(res);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }




}
