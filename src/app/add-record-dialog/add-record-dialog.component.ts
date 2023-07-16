import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../services/invoice.service';

export interface DialogData {
  customerId: string | number;
  customerName: string;
}

@Component({
  selector: 'app-add-record-dialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrls: ['./add-record-dialog.component.css']
})
export class AddRecordDialogComponent {

  @Output() newRecordAdded = new EventEmitter<any>();

  formCaption: string;
  amountControl = new FormControl('', Validators.required);
  customerId: string | number = this.data.customerId;  // Assuming 'data' is available in your component context

  constructor(
    private invoiceService: InvoiceService,
    private dialogRef: MatDialogRef<AddRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  submitForm() {
    if (this.amountControl.valid) {
      this.invoiceService.addInvoice(Number(this.customerId), Number(this.amountControl.value)).subscribe(
        response => {
          console.log(response); // Handle successful response
          // Emit the response data
          this.newRecordAdded.emit(response);
          // Close the dialog
          this.dialogRef.close(response);
        },
        error => {
          console.error(error); // Handle error response
        }
      );
    }
  }

  cancelNewRecord(): void {
    // Close the dialog without saving
    this.dialogRef.close();
  }

}
