import {  Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-add-company-to-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './add-company-to-employee.component.html',
  styleUrl: './add-company-to-employee.component.scss',
})
export class AddCompanyToEmployeeComponent implements OnInit {
  changeCompany() {
    this.restApi
      .addCompanyToEmployee(this.employeeId, this.companyId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.route.navigate(["list-employee"])
          this.toast.success(`${this.translate.instant("add-company-to-employee.change")} ${this.companyId} ${this.translate.instant("to")} ${this.employeeId} ${this.translate.instant("success")}`, this.translate.instant("notification"))
          this.dialogRef.close()
        },
        error: (err) => {
          console.log(err);
          this.toast.error(`${this.translate.instant("add-company-to-employee.change")} ${this.companyId} ${this.translate.instant("to")} ${this.employeeId}: ${err.statusText}`, this.translate.instant("notification"))
        },
      });
  }
  companyList: any;
  ngOnInit(): void {
    this.loadCompanies();
    console.log(this.employee)
    this.companyId = this.employee?.companyId
  }
  @Input() employee: any;
  @Input() employeeId: any;

  companyId: any;

  loadCompanies() {
    return this.restApi.getCompanies().subscribe({
      next: (res: any) => {
        this.companyList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  constructor(private restApi: RestApiService, private route: Router, private toast: ToastrService, private translate: TranslateService,public dialogRef: MatDialogRef<EditCompanyComponent>) {
    
  }
}
