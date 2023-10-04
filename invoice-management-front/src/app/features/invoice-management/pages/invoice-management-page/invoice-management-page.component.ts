import { Component } from '@angular/core';
import { Invoice } from '../../model/Invoice';
import { InvoiceManagementClientService } from '../../services/client-service/invoice-management-client.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice-management-page',
  templateUrl: './invoice-management-page.component.html',
  styleUrls: ['./invoice-management-page.component.css']
})
export class InvoiceManagementPageComponent {  
    Invoices: Invoice[] = [];  
    tableDataSource:  MatTableDataSource<Invoice> = new MatTableDataSource<Invoice>(this.Invoices);
    isEdit: boolean = false;

  constructor(private invoiceManagementClientService : InvoiceManagementClientService) {
      this.invoiceManagementClientService = invoiceManagementClientService;
    }

    ngOnInit() {
      this.invoiceManagementClientService.getInvoices().subscribe(result => {
        this.Invoices = result as Invoice[];
        this.tableDataSource = new MatTableDataSource<Invoice>(this.Invoices);
      });
    }
    
    addInvoice(invoice : Invoice) {
      invoice.id = this.getNextId();
      this.Invoices.push(invoice);

      this.tableDataSource = new MatTableDataSource<Invoice>(this.Invoices);  
    }

    updateInvoice(invoice: Invoice) {
      let invoiceToUpdate = this.Invoices.find(i => i.id === invoice.id);

      if(!invoiceToUpdate) {
        return;
      }

      invoiceToUpdate.amount = invoice.amount;
      invoiceToUpdate.customerName = invoice.customerName;
      invoiceToUpdate.date = invoice.date;
      invoiceToUpdate.status = invoice.status;
    }

    getNextId() {
      return this.Invoices.reduce((maxValue, currentObject) => {
        const currentPropertyValue = currentObject.id;
        return currentPropertyValue > maxValue ? currentPropertyValue : maxValue;
      }, 0) + 1; 
    }
  }