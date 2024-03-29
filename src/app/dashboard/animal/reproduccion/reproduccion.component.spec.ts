import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproduccionComponent } from './reproduccion.component';

describe('ReproduccionComponent', () => {
  let component: ReproduccionComponent;
  let fixture: ComponentFixture<ReproduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
