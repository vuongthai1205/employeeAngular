import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss',
})
export class DeleteEmployeeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {employee: any}) { }
  ngOnInit(): void {
    console.log(this.data.employee)
  }
}
