import { TestBed } from '@angular/core/testing';

import { RazaService } from './raza.service';

describe('RazaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RazaService = TestBed.get(RazaService);
    expect(service).toBeTruthy();
  });
});
