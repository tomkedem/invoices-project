import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '../Models/invoice.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../services/invoice.service';
import { TableTemplate } from '../shared/TableTemplate';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { Searchinvoice } from '../Models/searchinvoice.model';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AddRecordDialogComponent } from '../add-record-dialog/add-record-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatedInvoice } from '../Models/updatedInvoice.model';


@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  pageSizes = [7, 10, 15];
  page: number;
  length = 0;
  pageSize = 7;
  pageEvent: PageEvent;

  editingIndex: number = -1;

  displayedColumns: string[] = ['id', 'date', 'status', 'amount', 'customerName', 'actions'];
  dataSource = new MatTableDataSource<Invoice>([]);
  searchKeyword: string = '';
  totalRecords: number = 0;

  searchinvoice: Searchinvoice;
  isAddingNewRecord: boolean = false;
  newRecord: any = {};

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private confirmBoxService: ConfirmBoxEvokeService
  ) {}

  searchForm = this.fb.group({
    pageNumber: 0,
    pageSize: 7,
    orderByField: '',
    sort: '',
    searchKey: ''
  });

  ngOnInit(): void {
    this.getData();
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe((res: any) => {
      this.searchForm.patchValue({
        orderByField: res.active.charAt(0).toUpperCase() + res.active.slice(1),
        sort: res.direction
      });
      this.getData();

    });
  }
 
  
  addNewInvoice(customerId: string | number,customerName:string): void {
     
    const dialogRef = this.dialog.open(AddRecordDialogComponent, {
      data: { customerId: customerId, customerName: customerName }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('ppppp', result);
      
      if (result) {
        // Refresh the table data here
        this.getData();
        // Display success notification
        this.snackBar.open('New record added successfully', 'Close', {
          duration: 2000, // Duration in milliseconds
        });

      }
    });
  }
  reloadData(): void {
    // Logic to reload the table data
  }
  
  

  cancelRecord(isAddingNewRecord: boolean): void {
    if (isAddingNewRecord) {
      this.dataSource.data.shift();
      this.dataSource._updateChangeSubscription(); // Refresh the table
    }

    this.isAddingNewRecord = false;
    this.editingIndex = -1;
  }

  startEdit(index: number) {
    // Disable editing for other records
    this.editingIndex = -1;

    // Enable editing for the selected record
    this.editingIndex = index;
  }
  saveEdit(invoice: Invoice) {
    // Save only the updated fields (status and amount)
    const updatedInvoice: UpdatedInvoice = {
      id: invoice.id,
      status: invoice.status,
      amount: invoice.amount
    };
  
    this.invoiceService.editInvoice(updatedInvoice).subscribe(() => {
      this.editingIndex = -1;
      this.getData();
       // Show the snackbar notification
      this.snackBar.open('Update was successful', 'Close', {
        duration: 2000, // Duration in milliseconds
      });
    });
  }

  cancelEdit() {
    this.editingIndex = -1;
  }

  filter(event: any) {
    this.searchForm.patchValue({
      searchKey: event.target.value
    });
    this.page = 0;
    this.getData();
  }

  userTestStatus: TableTemplate[] = [
    { type: 'number', key: 'id', label: 'ID' },
    { type: 'date', key: 'date', label: 'Date' },
    { type: 'string', key: 'customerName', label: 'Name' },
    { type: 'string', key: 'status', label: 'Status' },
    { type: 'number', key: 'amount', label: 'Amount' }
  ];

  onPageChange(e: any) {
    this.searchForm.patchValue({
      pageNumber: e.pageIndex,
      pageSize: e.pageSize
    });
    this.getData();
  }

  getData() {
    this.searchinvoice = this.searchForm.value as Searchinvoice;
    this.invoiceService.fetchData(this.searchinvoice).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.invoices);
        this.length = res.totalCount;
      },
      error: (e) => console.error(e),
    });
  }
 
  
  deleteRecord(id: number) {
    this.confirmBoxService.danger(
      'Confirm Delete',
      `Are you sure you want to delete invoice number ${id}?`,
      'Yes',
      'No'
    ).subscribe(result => {
      console.log('tom', result.success);
      
      if (result.success) {
        // User confirmed, perform delete action
        this.invoiceService.deleteInvoice(id).subscribe({
          next: (res: any) => {
            this.getData();
             // Show the snackbar notification
            this.snackBar.open('Record deleted successfully', 'Close', {
              duration: 2000, // Duration in milliseconds
            });
          },
          error: (e) => console.error(e),
        });
      }
    });
  }
}
