import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ProductosVenta } from 'src/app/model/productos_venta/productos-venta';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-productos-venta',
  templateUrl: './productos-venta.component.html',
  styleUrls: ['./productos-venta.component.scss']
})
export class ProductosVentaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: ProductosVenta[] = [];
  displayedColumns: string[] = ['producto', 'costo', 'cantidad', 'opciones'];
  dataSource;
  isLoadingResults = true;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  productoForm: FormGroup;
  tipo_producto;
  precio;

  constructor(private productos: ProductoService, private formBuilder: FormBuilder) {
    this.productoForm = this.formBuilder.group({
      'tipo_producto' : [null, Validators.required],
      'costo': [null, Validators.required],
      'cantidad': [null, Validators.required]
    })
   }

  ngOnInit() {
    this.getProductos();
  }
  onLoad(){
    this.productos.getProductosVenta()
    .subscribe(res =>{
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onFormSubmit(form:NgForm){
    this.productos.addProductoVenta(form)
    .subscribe(res=>{
      let id_prod = res['_id_prod'];
      this.productoForm.reset();
      this.onLoad();

    })
  }

  getProductos(){
    this.productos.getProductosVenta()
    .subscribe(res =>{
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
