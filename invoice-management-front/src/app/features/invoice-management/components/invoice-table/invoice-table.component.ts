import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Invoice } from '../../model/Invoice';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StatusEnumService } from '../../services/status-enum-service';
import { InvoiceFormDataService } from '../../services/invoice-form-data.service';
import { InvoiceFormData } from '../../model/InvoiceFormData';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent {
  constructor(private invoiceFormDataService: InvoiceFormDataService, private statusEnumService: StatusEnumService) {}

  @Input() tableDataSource!: MatTableDataSource<Invoice>;

  clickedRows = new Set<Invoice>();
  displayedColumns: string[] = ['action', 'id', 'customername', 'date', 'status', 'amount'];

  fillEditForm(invoice: Invoice) {
    this.invoiceFormDataService.setIsEdit(true);
    this.invoiceFormDataService.setData(invoice);
  }

  getStatusString(status: number) {
     return this.statusEnumService.statusEnumMapping.get(status);
  }

  getDateFormat(date: Date) {
    return new Date(date).toDateString();
  }
}