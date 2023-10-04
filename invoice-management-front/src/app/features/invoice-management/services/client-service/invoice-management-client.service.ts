import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Invoice } from '../../model/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceManagementClientService {
  private readonly CONTROLLER_PATH = 'InvoiceManagement';

  constructor(private httpService: HttpService) {
    this.httpService = httpService;
  }

  addInvoice(data: Invoice) {
    return this.httpService.postData(`${this.CONTROLLER_PATH}/AddInvoice`, data);
  }
  
  editInvoice(data: Invoice) {
    return this.httpService.postData(`${this.CONTROLLER_PATH}/EditInvoice`, data);
  }

  getInvoices() {
    return this.httpService.getData(`${this.CONTROLLER_PATH}/GetInvoices`);
  }
} 