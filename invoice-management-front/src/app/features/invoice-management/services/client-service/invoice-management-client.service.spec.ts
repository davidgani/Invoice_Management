import { TestBed } from '@angular/core/testing';

import { InvoiceManagementClientService } from './invoice-management-client.service';

describe('InvoiceManagementClientService', () => {
  let service: InvoiceManagementClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceManagementClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
