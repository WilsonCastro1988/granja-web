import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from 'src/app/model/proveedor/proveedor';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ProvedorService } from 'src/app/services/provedor/provedor.service';
import { EditProveedorComponent } from './edit-proveedor/edit-proveedor.component';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Proveedor[] = [];
  displayedColumns: string[] = ['id_proveedor', 'nombre', 'direccion', 'telefono', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isLoadingResults = true;
  proveedorForm: FormGroup;
  p: number = 1;
  proveedor: Proveedor = { id_proveedor:0, nombre_provedor:'', direccion: '', telefono: ''};
  bsModalRef: BsModalRef;
  constructor(public dialog: MatDialog,public proveedorService: ProvedorService,  private formBuilder: FormBuilder,
    private bsModalService: BsModalService) {
      this.proveedorForm = this.formBuilder.group({
        'nombre_proveedor' : [null, Validators.required],
        'direccion' : [null, Validators.required],
        'telefono' : [null, Validators.required],
      })
  }

  ngOnInit() {
    this.getProveedores();
  }

  onload(){
    this.proveedorService.getProveedores()
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.proveedorService.addProveedor(form)
      .subscribe(res => {
          let id_proveedor = res['id_proveedor'];
          this.isLoadingResults = false;
          this.onload();
          this.proveedorForm.reset();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getProveedores(){
    this.proveedorService.getProveedores()
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


  deleteProveedor(id_proveedor) {
    this.isLoadingResults = true;
    if (confirm("Seguro desea eliminar?")) {
      this.proveedorService.deleteProveedor(id_proveedor)
    .subscribe(res => {
      this.isLoadingResults = false;
        this.onload();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
    } else {
      this.isLoadingResults = false;
      console.log( "You pressed Cancel!");
    }

}

editProveedor(id_proveedor: number) {
  this.proveedorService.changeProveedorId(id_proveedor);
  this.bsModalRef = this.bsModalService.show(EditProveedorComponent);
  this.bsModalRef.content.event.subscribe(result => {
    if (result == 'OK') {
      setTimeout(() => {
        this.isLoadingResults = false;
        this.getProveedores();
      }, 5000);
    }
  });
}

}
