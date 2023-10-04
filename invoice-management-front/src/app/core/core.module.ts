import { NgModule } from "@angular/core";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MaterialModule } from "../material.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        ToolbarComponent,
     ],
     imports: [
        MaterialModule,
        HttpClientModule
     ],
     exports: [
        ToolbarComponent,
        HttpClientModule
     ]
   })
export class CoreModule {}