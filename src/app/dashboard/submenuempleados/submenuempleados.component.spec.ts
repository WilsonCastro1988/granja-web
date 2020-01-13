import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuempleadosComponent } from './submenuempleados.component';

describe('SubmenuempleadosComponent', () => {
  let component: SubmenuempleadosComponent;
  let fixture: ComponentFixture<SubmenuempleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuempleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
