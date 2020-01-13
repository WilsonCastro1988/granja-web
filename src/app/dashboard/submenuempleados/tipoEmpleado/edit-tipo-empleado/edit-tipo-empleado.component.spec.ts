import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoEmpleadoComponent } from './edit-tipo-empleado.component';

describe('EditTipoEmpleadoComponent', () => {
  let component: EditTipoEmpleadoComponent;
  let fixture: ComponentFixture<EditTipoEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipoEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
