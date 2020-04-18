import { TestBed } from '@angular/core/testing';

import { DatawarehouseService } from './datawarehouse.service';

describe('DatawarehouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatawarehouseService = TestBed.get(DatawarehouseService);
    expect(service).toBeTruthy();
  });
});
