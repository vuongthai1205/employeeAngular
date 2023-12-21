import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PlacesService } from '../shared/places.service';
import { AddEmployeeToCompanyComponent } from '../add-employee-to-company/add-employee-to-company.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
    AddEmployeeToCompanyComponent,
    TranslateModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss',
})
export class EditCompanyComponent implements OnInit {
  isCheckCompany() {
    return true;
  }
  lastAddressValue: string = '';

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    this.getCompanyById();

    this.companyForm.get('address')!.valueChanges.subscribe((value) => {
      if (value !== this.lastAddressValue) {
        this.filterAddresses(value);
        this.lastAddressValue = value;
      }
    });
  }

  filterAddresses(value: string): void {
    const filterValue = value.toLowerCase();
    if (value && value !== this.lastAddressValue) {
      this.places.getPlace(value);
    }
    this.addresses = this.places.addresses.filter((address) =>
      address.properties.address_line1.toLowerCase().includes(filterValue)
    );
  }

  companyId: any;
  companyForm = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
  });
  addresses: any[] = [];
  onSubmit() {
    this.restApi.editCompany(this.companyId, this.companyForm.value).subscribe({
      next: (res: any) => {
        this.toast.success(
          `${this.translate.instant("edit-company")} ${res.data.name} ${this.translate.instant("success")}`,
          this.translate.instant('notification')
        );
        this.router.navigate(['/list-company']);
      },
      error: (err) => {
        console.log(err);
        this.toast.error(`${this.translate.instant("error")}: ${err}`, this.translate.instant('notification'));
      },
    });
  }
  getCompanyById = () => {
    this.restApi.getCompany(this.companyId).subscribe({
      next: (res: any) => {
        this.companyForm.controls.name.setValue(res.data.name);
        this.companyForm.controls.address.setValue(res.data.address);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  constructor(
    private restApi: RestApiService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private places: PlacesService,
    private translate: TranslateService
  ) {}
}
