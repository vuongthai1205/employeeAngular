import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-employee-to-company',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './add-employee-to-company.component.html',
  styleUrl: './add-employee-to-company.component.scss',
})
export class AddEmployeeToCompanyComponent implements OnInit {
  @Input() companyId: any;
  employeeList: any;
  employees = new FormControl();
  ngOnInit(): void {
    console.log(this.companyId);
    this.loadEmployee();
  }

  addEmployees = () => {
    this.restApi
      .addEmployeesToCompany(this.companyId, this.employees.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success(
            `${this.translate.instant("add-employee.text")} ${this.employees.value} ${this.translate.instant("to")} ${this.translate.instant("company")} ${this.companyId} ${this.translate.instant("success")}`,
           this.translate.instant("notification")
          );
          this.route.navigate(['list-company']);
        },
        error: (err) => {
          this.toast.error(
            `${this.translate.instant("add-employee.text")} ${this.translate.instant("error")}: ${err.error.title}`,
           this.translate.instant("notification")
          );
        },
      });
  };

  constructor(
    private restApi: RestApiService,
    private route: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  loadEmployee() {
    return this.restApi.getEmployees().subscribe({
      next: (res: any) => {
        // Lọc ra những employee có giá trị company bằng null
        this.employeeList = res.data.filter(
          (employee: any) => employee.company === null
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
