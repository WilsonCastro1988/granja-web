import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazadetalleComponent } from './razadetalle.component';

describe('RazadetalleComponent', () => {
  let component: RazadetalleComponent;
  let fixture: ComponentFixture<RazadetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazadetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
