import { Injectable } from "@angular/core";
import EnumUtils from "src/app/core/Utils/EnumUtils";
import { StatusEnum } from "../model/enums/StatusEnum";

@Injectable({
    providedIn: 'root'
})
export class StatusEnumService {
    statusOptions: string[] = ['Paid', 'Unpaid'];
    statusEnumMapping: Map<number, string> = EnumUtils.enumToMap(this.statusOptions, StatusEnum);


    getStatusEnumByStatusString(status: string) {
        for (const [key, value] of this.statusEnumMapping.entries()) {
            if (value === status) {
                return key;
            }
        }
        
        return null;
    }
}