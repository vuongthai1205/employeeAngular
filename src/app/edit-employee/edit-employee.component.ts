import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyToEmployeeComponent } from '../add-company-to-employee/add-company-to-employee.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, AddCompanyToEmployeeComponent, TranslateModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit, AfterViewInit {
  isCheckCompany() {
    if ( this.isCheck ){
      return true;
    }
    else{
      return false;
    }
  }
  isCheck : boolean = false;
  onSubmit() {
    this.restApi
      .editEmployee(this.employeeId, this.employeeForm.value)
      .subscribe({
        next: (res: any) => {
          this.toast.success(
            `${this.translate.instant("edit-employee.text")} ${res.data.phone} ${this.translate.instant("success")}`,
            this.translate.instant('notification')
          );
          this.router.navigate(["/list-employee"])
        },
        error: (err) => {
          console.log(err);
          this.toast.error(`${this.translate.instant("error")}: ${err}`, this.translate.instant("notification"));
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
    private translate : TranslateService
  ) {}
  ngAfterViewInit(): void {
    console.log(this.employeeForm);
  }
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.getEmployeeById();
  }
  getEmployeeById = () => {
    this.restApi.getEmployee(this.employeeId).subscribe({
      next: (res: any) => {
        this.employeeForm.controls.firstName.setValue(res.data.firstName);
        this.employeeForm.controls.lastName.setValue(res.data.lastName);
        this.employeeForm.controls.phone.setValue(res.data.phone);
        this.employeeForm.controls.companyId.setValue(res.data.company?.id);
        this.isCheck = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
}
