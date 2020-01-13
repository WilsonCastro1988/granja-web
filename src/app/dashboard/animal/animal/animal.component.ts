import { AnimalService } from './../../../services/animal/animal.service';
import { Animal } from './../../../model/animal/animal';
import { ParcelaService } from './../../../services/parcela/parcela.service';
import { RazaService } from './../../../services/raza/raza.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Raza } from 'src/app/model/raza/raza';
import { Parcela } from 'src/app/model/parcela/parcela';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataRazas: Raza[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'raza', 'fecha_adquisicion', 'fecha_nacimiento', 'peso', 'sexo', 'opciones'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isLoadingResults = true;
  animalForm: FormGroup;
  // animal: Animal = { id_animal= any, id_parcela=0, id_raza=0,nombre='',fecha_nacimiento='',fecha_adquisicion='',foto='',estado='', sexo=''};
  dataParcelas: Parcela[] = [];
  data: Animal[] = [];
  public imagePath;
  url;
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result; //add source to image

      }
    }
  }


  constructor(private razaService: RazaService, private parcelaService: ParcelaService,
    private animalService: AnimalService, private formBuilder: FormBuilder) {

      this.animalForm = this.formBuilder.group({
      'id_parcela': [null, Validators.required],
      'id_raza': [null, Validators.required],
      'nombre': [null, Validators.required],
      'fecha_nacimiento': [null, Validators.required],
      'fecha_adquisicion': [null, Validators.required],
      'peso': [null, Validators.required],
      'foto': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'estado': [null, Validators.required],
      'sexo': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getParcelas();
    this.getRazas();
    this.getAnimales();
  }

  getFormData() {
    console.log(this.animalForm);
  }

  getRazas() {
    this.razaService.getRazas()
      .subscribe(res => {
        this.dataRazas = res;
      }, err => {
        console.log(err);
      });
  }

  getParcelas() {
    this.parcelaService.getParcelas()
      .subscribe(res => {
        this.dataParcelas = res;
      }, err => {
        console.log(err);
      });
  }

  onload() {
    this.animalService.getAnimales()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.animalService.addAnimal(form)
      .subscribe(res => {
        let id_animal = res['_id_animal'];
        this.isLoadingResults = false;
        this.onload();
        this.animalForm.reset();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  getAnimales() {
    this.animalService.getAnimales()
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

}
