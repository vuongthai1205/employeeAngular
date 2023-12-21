import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyToEmployeeComponent } from '../add-company-to-employee/add-company-to-employee.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddCompanyToEmployeeComponent,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit, AfterViewInit {
  isCheckCompany() {
    return true;
  }
  isCheck: boolean = false;
  onSubmit() {
    this.restApi
      .editEmployee(this.employeeId, this.employeeForm.value)
      .subscribe({
        next: (res: any) => {
          this.toast.success(
            `${this.translate.instant('edit-employee.text')} ${
              res.data.phone
            } ${this.translate.instant('success')}`,
            this.translate.instant('notification')
          );
        },
        error: (err) => {
          console.log(err);
          this.toast.error(
            `${this.translate.instant('error')}: ${err}`,
            this.translate.instant('notification')
          );
        },
      });
  }

  employeeId: any;
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    companyId: new FormControl(),
  });
  constructor(
    private restApi: RestApiService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: any }
  ) {}
  ngAfterViewInit(): void {
    console.log(this.employeeForm);
  }
  ngOnInit(): void {
    this.employeeForm.controls.firstName.setValue(this.data.employee.firstName);
    this.employeeForm.controls.lastName.setValue(this.data.employee.lastName);
    this.employeeForm.controls.phone.setValue(this.data.employee.phone);
    this.employeeForm.controls.companyId.setValue(this.data.employee.company?.id);

    this.employeeId = this.data.employee.staffCode
    // this.employeeId = this.route.snapshot.params['id'];
    // this.getEmployeeById();
  }
  // getEmployeeById = () => {
  //   this.restApi.getEmployee(this.employeeId).subscribe({
  //     next: (res: any) => {
  //       this.employeeForm.controls.firstName.setValue(res.data.firstName);
  //       this.employeeForm.controls.lastName.setValue(res.data.lastName);
  //       this.employeeForm.controls.phone.setValue(res.data.phone);
  //       this.employeeForm.controls.companyId.setValue(res.data.company?.id);
  //       this.isCheck = true;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // };
}
