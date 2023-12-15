import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
})
export class ListEmployeeComponent implements OnInit {
  
  constructor(
    private router: Router,
    public restApi: RestApiService,
    public dialog: MatDialog,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  employeeList = new Array();

  loadEmployees() {
    return this.restApi.getEmployees().subscribe({
      next: (res: any) => {
        this.employeeList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  AddEmployee() {
    this.router.navigate(['list-employee/add-employee']);
  }

  openDialog(id : any) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.restApi.deleteEmployee(id).subscribe({
          next: (res : any) => {
            this.toast.success(`Delete Employee ${id} success`,"Notification", {
              progressBar: true
            })
            this.loadEmployees();
          },
          error: (err : any) => {
            console.log(err)
          }
        })
      }
    });
  }
}
