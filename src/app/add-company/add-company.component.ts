import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss',
})
export class AddCompanyComponent implements OnInit {
  companyForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private router: Router,
    private restApi: RestApiService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.companyForm.value);
    this.restApi.addCompany(this.companyForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(
          `${this.translate.instant('add-company.text')}: ${
            res.data.name
          } ${this.translate.instant('success')}`,
          this.translate.instant('notification')
        );
        this.router.navigate(['list-company']);
      },
      error: (err) => {
        this.toastr.error(
          `${this.translate.instant('Error')}: ${err}`,
          this.translate.instant('notification')
        );
      },
    });
  }
}
