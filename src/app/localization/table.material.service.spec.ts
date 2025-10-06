import { TestBed } from '@angular/core/testing';

import { TableMaterialService } from './table.material.service';

describe('TableMaterialService', () => {
  let service: TableMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
