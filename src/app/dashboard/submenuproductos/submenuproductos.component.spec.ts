import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuproductosComponent } from './submenuproductos.component';

describe('SubmenuproductosComponent', () => {
  let component: SubmenuproductosComponent;
  let fixture: ComponentFixture<SubmenuproductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
