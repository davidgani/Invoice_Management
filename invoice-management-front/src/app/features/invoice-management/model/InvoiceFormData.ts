export interface InvoiceFormData {
    customerName: string;
    date: Date;
    amount: number;
    status: string | undefined;
}