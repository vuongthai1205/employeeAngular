import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Route,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    TranslateModule,
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
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}
  page: any;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.page = params.get('page');
      this.loadEmployees();
      this.loadCountEmployee();
    });
  }
  employeeList = new Array();
  countEmployee: any;
  loadEmployees() {
    return this.restApi.getEmployees(this.page).subscribe({
      next: (res: any) => {
        this.employeeList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadCountEmployee() {
    return this.restApi.getCountEmployee().subscribe({
      next: (res: any) => {
        this.countEmployee = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  AddEmployee() {
    this.router.navigate(['list-employee/add-employee']);
  }

  openDialog(id: any) {
    const selectedEmployee = this.employeeList.find(
      (employee) => employee.staffCode === id
    );
    if (selectedEmployee) {
      const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
        data: { employee: selectedEmployee },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.restApi.deleteEmployee(id).subscribe({
            next: (res: any) => {
              this.toast.success(
                `${this.translateService.instant(
                  'delete-employee.text'
                )} ${id} ${this.translateService.instant('success')}`,
                `${this.translateService.instant('notification')}`,
                {
                  progressBar: true,
                }
              );
              this.loadEmployees();
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
      });
    } else {
      console.log(`${this.translateService.instant('employee-with-id')} ${id} ${this.translateService.instant('not-found')}`);
    }
  }
}
