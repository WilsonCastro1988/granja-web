import { Component, OnInit, ViewChild } from '@angular/core';
import { ParcelaService } from 'src/app/services/parcela/parcela.service';
import { Parcela } from 'src/app/model/parcela/parcela';
import { FormBuilder, FormGroup, Validators,  NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditParcelaComponent } from './edit-parcela/edit-parcela.component';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.scss']
})
export class ParcelaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: Parcela[] = [];
  displayedColumns: string[] = ['id_parcela', 'lugar', 'descripcion', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  parcelaForm: FormGroup;
  parcela: Parcela={id_parcela:0, lugar:'', descripcion:''};
  bsModalRef: BsModalRef;
  parcelaList: any[] =[];
  isLoadingResults = true;
  constructor(private parcelaService: ParcelaService, private formBuilder: FormBuilder, private bsModalService: BsModalService) {
    this.parcelaForm = this.formBuilder.group({
      'lugar' : [null, Validators.required],
      'descripcion': [null, Validators.required]
    })
   }

  ngOnInit() {

    this.getParcelas();
  }

  onLoad(){
    this.parcelaService.getParcelas()
    .subscribe(res =>{
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
    })
  }

  onFormSubmit(form:NgForm){
    this.parcelaService.addParcela(form)
    .subscribe(res=>{
      let id_parcela = res['_id_parcela'];
      this.parcelaForm.reset();
      this.onLoad();

    })
  }

  getParcelas(){
    this.parcelaService.getParcelas()
    .subscribe(res =>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  editParcela(id_parcela:number){
    this.parcelaService.changeParcelaId(id_parcela);
    this.bsModalRef = this.bsModalService.show(EditParcelaComponent);
    this.bsModalRef.content.event.subscribe(result =>{
      if(result == 'OK'){
        setTimeout(()=>{
          this.getParcelas();
        },5000);
      }
    })
  }

  deleteParcela(id_parcela){
    this.parcelaService.deleteParcela(id_parcela)
    .subscribe(res =>{
      this.onLoad();
    })
  }


}
