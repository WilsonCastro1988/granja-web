import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazaaddComponent } from './razaadd.component';

describe('RazaaddComponent', () => {
  let component: RazaaddComponent;
  let fixture: ComponentFixture<RazaaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazaaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
