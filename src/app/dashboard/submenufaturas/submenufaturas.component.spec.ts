import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenufaturasComponent } from './submenufaturas.component';

describe('SubmenufaturasComponent', () => {
  let component: SubmenufaturasComponent;
  let fixture: ComponentFixture<SubmenufaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenufaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenufaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
