// edit-row.component.ts
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css']
})
export class EditRowComponent {
  @Input() rowData: any; // Input property to receive the data for editing
  editForm: FormGroup;

  constructor() {
    this.editForm = new FormGroup({
      field1: new FormControl(),
      field2: new FormControl(),
      // Add more form controls for other fields
    });
  }

  // Method to save the edited data
  saveData() {
    // Perform the save logic here
    // ...
  }
}
