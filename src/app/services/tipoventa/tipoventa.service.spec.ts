import { TestBed } from '@angular/core/testing';

import { TipoventaService } from './tipoventa.service';

describe('TipoventaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoventaService = TestBed.get(TipoventaService);
    expect(service).toBeTruthy();
  });
});
