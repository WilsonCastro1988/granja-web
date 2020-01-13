import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RazaService } from 'src/app/services/raza/raza.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-razaedit',
  templateUrl: './razaedit.component.html',
  styleUrls: ['./razaedit.component.scss']
})
export class RazaeditComponent implements OnInit {

  id_raza:number;
  isLoadingResults = false;
  editRazaForm: FormGroup;
  categories: any[] = [];
  razaData: any;
  event: EventEmitter<any> = new EventEmitter();
  
  constructor(private router: Router, private route: ActivatedRoute,
              private api: RazaService, private formBuilder: FormBuilder, private bsModalRef: BsModalRef) {
      this.editRazaForm = this.formBuilder.group({
        tipo_raza: new FormControl(null, []),
        descripcion: new FormControl('', [])
      }) ;

      this.api.razaIdData.subscribe(data => {
        this.id_raza = data;
        if (this.id_raza !== undefined) {
          this.api.getRaza(this.id_raza).subscribe(data => {
            this.razaData = data;
            console.log(this.razaData);
            
            
            if (this.editRazaForm!=null && this.razaData!=null) {
              this.editRazaForm.controls['tipo_raza'].setValue(this.razaData.tipo_raza);
              this.editRazaForm.controls['descripcion'].setValue(this.razaData.descripcion);
            }
          }, error => { console.log("Error while gettig post details") });
        }
      });
   }
  
   onRazaEditFormSubmit() {
    let razaData = {
      'id_raza': this.id_raza,
      'tipo_raza': this.editRazaForm.get('tipo_raza').value,
      'descripcion': this.editRazaForm.get('descripcion').value,
    };

    this.api.modificarRaza(razaData).subscribe(data => {      
        this.event.emit('OK');
        this.bsModalRef.hide();      
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit() {
  // this.getRaza(this.route.snapshot.params['id_raza']);
  // this.razaForm = this.formBuilder.group({
  //   'tipo_raza' : [null, Validators.required],
  //   'descripcion' : [null, Validators.required]
  // });
  }

  }
