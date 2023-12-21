import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
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
    private translateService: TranslateService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.dataSource = new MatTableDataSource(this.employeeList);
  }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();
  page: any;
  ngOnInit(): void {
    this.loadEmployees();
  }
  employeeList = new Array();
  displayedColumns: string[] = [
    'staffCode',
    'firstName',
    'lastName',
    'phone',
    'actions',
  ];
  countEmployee: any;
  loadEmployees() {
    return this.restApi.getEmployees().subscribe({
      next: (res: any) => {
        this.employeeList = res.data;
        this.dataSource = new MatTableDataSource(this.employeeList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  AddEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openDialogView(id: any) {
    const selectedEmployee = this.employeeList.find(
      (employee) => employee.staffCode === id
    );

    if (selectedEmployee) {
      const dialogRef = this.dialog.open(ViewEmployeeComponent, {
        data: { employee: selectedEmployee },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    } else {
      console.log(
        `${this.translateService.instant(
          'employee-with-id'
        )} ${id} ${this.translateService.instant('not-found')}`
      );
    }
  }

  openDialogEdit(id: any) {
    const selectedEmployee = this.employeeList.find(
      (employee) => employee.staffCode === id
    );

    if (selectedEmployee) {
      const dialogRef = this.dialog.open(EditEmployeeComponent, {
        data: { employee: selectedEmployee },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadEmployees();
        }
      });
    } else {
      console.log(
        `${this.translateService.instant(
          'employee-with-id'
        )} ${id} ${this.translateService.instant('not-found')}`
      );
    }
  }

  openDialogDelete(id: any) {
    const selectedEmployee = this.employeeList.find(
      (employee) => employee.staffCode === id
    );
    if (selectedEmployee) {
      const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
        data: { employee: selectedEmployee },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
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
      console.log(
        `${this.translateService.instant(
          'employee-with-id'
        )} ${id} ${this.translateService.instant('not-found')}`
      );
    }
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
