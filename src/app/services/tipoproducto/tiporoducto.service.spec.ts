import { TestBed } from '@angular/core/testing';

import { TiporoductoService } from './tiporoducto.service';

describe('TiporoductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiporoductoService = TestBed.get(TiporoductoService);
    expect(service).toBeTruthy();
  });
});
