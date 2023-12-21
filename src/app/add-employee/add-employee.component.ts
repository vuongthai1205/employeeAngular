import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import {  ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
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
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent{
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(
    private router: Router,
    private restApi: RestApiService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {}

  onSubmit() {
    this.restApi.addEmployee(this.employeeForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(
          `${this.translate.instant('add-employee.text')} ${
            res.data.phone
          } ${this.translate.instant('success')}`,
          this.translate.instant('notification')
        );
        this.employeeForm.controls.firstName.setValue('');
        this.employeeForm.controls.lastName.setValue('');
        this.employeeForm.controls.phone.setValue('');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(
          `${this.translate.instant('error')}: ${err}`,
          this.translate.instant('notification')
        );
      },
    });
  }
}
