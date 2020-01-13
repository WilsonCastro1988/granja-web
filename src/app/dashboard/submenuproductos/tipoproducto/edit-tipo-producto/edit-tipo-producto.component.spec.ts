import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoProductoComponent } from './edit-tipo-producto.component';

describe('EditTipoProductoComponent', () => {
  let component: EditTipoProductoComponent;
  let fixture: ComponentFixture<EditTipoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
