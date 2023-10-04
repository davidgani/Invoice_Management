import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../../model/Invoice';
import { StatusEnumService } from '../../services/status-enum-service';
import { InvoiceManagementClientService } from '../../services/client-service/invoice-management-client.service';
import { InvoiceFormDataService } from '../../services/invoice-form-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-edit-invoice',
  templateUrl: './add-edit-invoice.component.html',
  styleUrls: ['./add-edit-invoice.component.css']
})
export class AddEditInvoiceComponent {
  @Output() newInvoiceEvent = new EventEmitter<Invoice>();
  @Output() updateInvoiceEvent = new EventEmitter<Invoice>();
  
  statusOptions: string[] = ['Paid', 'Unpaid'];
  form: FormGroup;
  isEdit: boolean = false;
  invoiceToEdit: Invoice | undefined

  constructor(private fb: FormBuilder,
    private invoiceManagementClientService: InvoiceManagementClientService,
    private statusEnumService: StatusEnumService,
    private snackBar: MatSnackBar,
    private invoiceFormDataService : InvoiceFormDataService) {
    this.invoiceManagementClientService = invoiceManagementClientService;
    this.invoiceFormDataService = invoiceFormDataService;
    this.statusEnumService = statusEnumService;
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      date: [null, Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.invoiceFormDataService.currentData.subscribe(data => {
      if(data) {
      this.invoiceToEdit = data;
      let invoiceForm = this.invoiceFormDataService.convertInvoiceToInvoiceFormData(data)
      this.form.patchValue(invoiceForm);
      }
    })

    this.invoiceFormDataService.isEdit.subscribe(value => this.isEdit = value);
  }

  submitForm() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.editInvoice();
      }
      else {
        this.addInvoice();
      }
    }
  }

  addInvoice() {
    let invoice = this.prepareNewInvoiceItem();
    this.invoiceManagementClientService.addInvoice(invoice).subscribe(() => {
      this.newInvoiceEvent.emit(invoice);
      this.openSnackBar("Invoice added succesfully!");
      this.invoiceFormDataService.resetForm(this.form);
    });
  }

  editInvoice() {
    let form = this.form.value;

    let invoice: Invoice = {
      id: this.invoiceToEdit!.id,
      customerName: form.customerName,
      date: form.date,
      amount: parseInt(form.amount),
      status: this.statusEnumService.getStatusEnumByStatusString(form.status) as number 
    };

    this.invoiceManagementClientService.editInvoice(invoice).subscribe(() => {
      this.updateInvoiceEvent.emit(invoice);
      this.openSnackBar("Invoice edited succesfully!");
      this.invoiceFormDataService.resetForm(this.form);
    })
  }

  prepareNewInvoiceItem(){
    let form = this.form.value;
  
    let newInvoice: Invoice = {
      id: -1,
      customerName: form.customerName,
      date: form.date,
      amount: parseInt(form.amount),
      status: this.statusEnumService.getStatusEnumByStatusString(form.status) as number 
    };
    
    return newInvoice;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}