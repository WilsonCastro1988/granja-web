import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazaeditComponent } from './razaedit.component';

describe('RazaeditComponent', () => {
  let component: RazaeditComponent;
  let fixture: ComponentFixture<RazaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
