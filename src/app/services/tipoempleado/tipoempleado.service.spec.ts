import { TestBed } from '@angular/core/testing';

import { TipoempleadoService } from './tipoempleado.service';

describe('TipoempleadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoempleadoService = TestBed.get(TipoempleadoService);
    expect(service).toBeTruthy();
  });
});
