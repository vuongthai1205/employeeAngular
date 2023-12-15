import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss',
})
export class DeleteEmployeeComponent implements OnInit {
  
  ngOnInit(): void {
    console.log(1)
  }
}
