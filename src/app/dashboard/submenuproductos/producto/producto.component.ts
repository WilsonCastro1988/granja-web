import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { ProvedorService } from 'src/app/services/provedor/provedor.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/model/producto/producto';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto/producto.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Producto[] = [];
  displayedColumns: string[] = ['id_producto', 'proveedor', 'nombre', 'cantidad', 'precio', 'presentacion', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isLoadingResults = true;
  productoForm: FormGroup;
  p: number = 1;
  producto: Producto = { id_producto:0, id_proveedor: 0, nombre: '', cantidad: 0, precio: 0, presentacion: ''};
  dataProveedores;
  bsModalRef: BsModalRef;
  constructor(public dialog: MatDialog,public productoService: ProductoService,  private formBuilder: FormBuilder,
    private bsModalService: BsModalService, private proveedorService: ProvedorService) {
      this.productoForm = this.formBuilder.group({
        'id_proveedor' : [null, Validators.required],
        'nombre' : [null, Validators.required],
        'cantidad' : [null, Validators.required],
        'precio' : [null, Validators.required],
        'presentacion' : [null, Validators.required]

      });
    }

  ngOnInit() {
    this.getProductos();
    this.getProveedores();
  }

  getProveedores(){
    this.proveedorService.getProveedores()
    .subscribe(res => {
      this.dataProveedores = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onload(){
    this.productoService.getProductos()
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.productoService.addProducto(form)
      .subscribe(res => {
          let id_producto = res['id_producto'];
          this.isLoadingResults = false;
          this.onload();
          this.productoForm.reset();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getProductos(){
    this.productoService.getProductos()
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


  deleteProducto(id_producto) {
    this.isLoadingResults = true;
    this.productoService.deleteProducto(id_producto)
    .subscribe(res => {
      this.isLoadingResults = false;
        this.onload();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}

editProducto(id_producto: number) {
  this.productoService.changeProductoId(id_producto);
  this.bsModalRef = this.bsModalService.show(EditProductoComponent);
  this.bsModalRef.content.event.subscribe(result => {
    if (result == 'OK') {
      setTimeout(() => {
        this.isLoadingResults = false;
        this.getProductos();
      }, 5000);
    }
  });
}


}
