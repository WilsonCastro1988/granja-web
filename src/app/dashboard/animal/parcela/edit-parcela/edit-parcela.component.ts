import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ParcelaService } from 'src/app/services/parcela/parcela.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-parcela',
  templateUrl: './edit-parcela.component.html',
  styleUrls: ['./edit-parcela.component.scss']
})
export class EditParcelaComponent implements OnInit {
  id_parcela:number;
  editParcelaForm:FormGroup;
  parcelaData:any;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private parcelaService: ParcelaService, private formBuilder: FormBuilder, private bsModalRef: BsModalRef) { 
    this.editParcelaForm = this.formBuilder.group({
      lugar: new FormControl(null,[]),
      descripcion: new FormControl(null,[])
    })

    this.parcelaService.parcelaIdData.subscribe(data=>{
      this.id_parcela = data;
      if(this.id_parcela != undefined){
        this.parcelaService.getParcela(this.id_parcela).subscribe(data=>{
          this.parcelaData = data;

          if(this.editParcelaForm!=null && this.parcelaData!=null){
            this.editParcelaForm.controls['lugar'].setValue(this.parcelaData.lugar),
            this.editParcelaForm.controls['descripcion'].setValue(this.parcelaData.descripcion)
          }
        
        })
      }
    })
  }

  ngOnInit() {
  }

  onParcelaEditFormSubmit(){
    let parcelaData={
      'id_parcela': this.id_parcela,
      'lugar':this.editParcelaForm.get('lugar').value,
      'descripcion':this.editParcelaForm.get('descripcion').value,
    };
    this.parcelaService.modificarParcela(parcelaData).subscribe(data=>{
      this.event.emit('OK');
        this.bsModalRef.hide();  
    })
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
