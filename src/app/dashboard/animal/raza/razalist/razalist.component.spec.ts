import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazalistComponent } from './razalist.component';

describe('RazalistComponent', () => {
  let component: RazalistComponent;
  let fixture: ComponentFixture<RazalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
