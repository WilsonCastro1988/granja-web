import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParcelaComponent } from './edit-parcela.component';

describe('EditParcelaComponent', () => {
  let component: EditParcelaComponent;
  let fixture: ComponentFixture<EditParcelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParcelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
