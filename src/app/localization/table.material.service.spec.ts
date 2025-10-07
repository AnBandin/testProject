import { TestBed } from '@angular/core/testing';
import { MyCustomPaginatorIntl } from './table.material.service';

describe('MyCustomPaginatorIntl', () => {
  let service: MyCustomPaginatorIntl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCustomPaginatorIntl]
    });
    service = TestBed.inject(MyCustomPaginatorIntl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
