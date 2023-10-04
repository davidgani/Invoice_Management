import { Component, Input } from '@angular/core';
import { Invoice } from '../../model/Invoice';
import { StatusEnumService } from '../../services/status-enum-service';
import { StatusEnum } from '../../model/enums/StatusEnum';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent {
  @Input() Invoices: Invoice[] = [];

  getTotalPaidInvoices() {
    return this.Invoices.filter(i => i.status === StatusEnum.Paid).length;
  }

  getTotalOwed() {
    let total = 0;

    this.Invoices.forEach((invoice) => {
      if (invoice.status === StatusEnum.Unpaid) {
        total += invoice.amount;
      }
    });

    return total;
  }

  getTotalUnpaidInvoices() {
    return this.Invoices.filter(i => i.status === StatusEnum.Unpaid).length;
  }
}