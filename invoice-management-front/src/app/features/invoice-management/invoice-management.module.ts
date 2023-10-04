import { NgModule } from '@angular/core';
import { InvoiceSummaryComponent } from './components/invoice-summary/invoice-summary.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditInvoiceComponent } from './components/add-edit-invoice/add-edit-invoice.component';
import { InvoiceManagementPageComponent } from './pages/invoice-management-page/invoice-management-page.component';


@NgModule({
 declarations: [
    InvoiceManagementPageComponent,
    InvoiceTableComponent,
    InvoiceSummaryComponent,
    AddEditInvoiceComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    InvoiceManagementPageComponent,
    InvoiceTableComponent,
    InvoiceSummaryComponent,
    AddEditInvoiceComponent
  ]
})
export class InvoiceManagementModule {}