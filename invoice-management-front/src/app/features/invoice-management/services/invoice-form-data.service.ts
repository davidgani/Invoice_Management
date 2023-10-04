import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/Invoice';
import { StatusEnumService } from './status-enum-service';
import { FormGroup } from '@angular/forms';


@Injectable({
     providedIn: 'root'
})
export class InvoiceFormDataService {
     private data = new BehaviorSubject<Invoice | null>(null);
     private isEditSubject = new BehaviorSubject<boolean>(false);
     currentData = this.data.asObservable();
     isEdit = this.isEditSubject.asObservable();

     constructor(private statusEnumService: StatusEnumService) {
          this.statusEnumService = statusEnumService;
     }

     setData(data: Invoice) {
          this.data.next(data);
     }

     setIsEdit(value: boolean) {
          this.isEditSubject.next(value);
     }

     convertInvoiceToInvoiceFormData(invoice: Invoice) {
          return {
               amount: invoice.amount,
               customerName: invoice.customerName,
               date: invoice.date,
               status: this.statusEnumService.statusEnumMapping.get(invoice.status)
          };
     }

     resetForm(form: FormGroup) {
          form.reset();
            
            for (let name in form.controls) {
              form.controls[name].setErrors(null);
           }
        }
}