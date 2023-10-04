import { NgModule } from "@angular/core";
import { InvoiceManagementModule } from "./invoice-management/invoice-management.module";


@NgModule({
    imports: [
        InvoiceManagementModule
     ],
     exports: [
        InvoiceManagementModule
     ]
   })
   export class FeaturesModule {}