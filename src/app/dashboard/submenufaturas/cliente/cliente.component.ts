import { BsModalService } from 'ngx-bootstrap/modal';
import { ClienteService } from './../../../services/cliente/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Cliente[] = [];
  displayedColumns: string[] = ['cedula', 'nombre', 'direccion', 'telefono', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isLoadingResults = true;
  clienteForm: FormGroup;
  p: number = 1;
  cliente: Cliente = { id_cliente: 0, cedula: '', nombre: '', apellido: null, direccion:'', telefono:'' };
  clienteList: any[] = [];
  bsModalRef: BsModalRef;
  constructor(public dialog: MatDialog,
    public clienteService: ClienteService,  private formBuilder: FormBuilder,
    private bsModalService: BsModalService) {
      this.clienteForm = this.formBuilder.group({
        'cedula' : [null, Validators.required],
        'nombre' : [null, Validators.required],
        'apellido' : [null, Validators.required],
        'direccion' : [null, Validators.required],
        'telefono' : [null, Validators.required]
      });
    }

    ngOnInit() {
      this.getClientes();
    }

    onload(){
      this.clienteService.getClientes()
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
      this.clienteService.addCliente(form)
        .subscribe(res => {
            let id_cliente = res['_id_cliente'];
            this.isLoadingResults = false;
            this.onload();
            this.clienteForm.reset();
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          });
    }

    getClientes(){
      this.clienteService.getClientes()
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


    deleteCliente(id_cliente) {
      this.isLoadingResults = true;
      this.clienteService.deleteCliente(id_cliente)
      .subscribe(res => {
        this.isLoadingResults = false;
          this.onload();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }


  editCliente(id_cliente: number) {
    this.clienteService.changeClienteId(id_cliente);

    this.bsModalRef = this.bsModalService.show(EditClienteComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.getClientes();
        }, 5000);
      }
    });
  }


}
