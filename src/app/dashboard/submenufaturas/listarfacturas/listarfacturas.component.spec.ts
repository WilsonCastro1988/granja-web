import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarfacturasComponent } from './listarfacturas.component';

describe('ListarfacturasComponent', () => {
  let component: ListarfacturasComponent;
  let fixture: ComponentFixture<ListarfacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarfacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
