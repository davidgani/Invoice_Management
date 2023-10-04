import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceManagementPageComponent } from './invoice-management-page.component';

describe('InvoiceManagementPageComponent', () => {
  let component: InvoiceManagementPageComponent;
  let fixture: ComponentFixture<InvoiceManagementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceManagementPageComponent]
    });
    fixture = TestBed.createComponent(InvoiceManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
