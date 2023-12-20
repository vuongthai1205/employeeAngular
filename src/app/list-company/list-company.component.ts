import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-company',
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
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss',
})
export class ListCompanyComponent implements OnInit {
  addCompany() {
    this.route.navigate(['add-company']);
  }
  companyList = new Array();

  constructor(
    private route: Router,
    private restApi: RestApiService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }
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

  openDialog(id: any) {
    const selectedCompany = this.companyList.find(
      (company) => company.id === id
    );
    if (selectedCompany) {
      const dialogRef = this.dialog.open(DeleteCompanyComponent, {
        data: { company: selectedCompany },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.restApi.deleteCompany(id).subscribe({
            next: (res: any) => {
              this.toast.success(
                `${this.translate.instant(
                  'delete-company.text'
                )} ${id} ${this.translate.instant('success')}`,
                this.translate.instant('notification'),
                {
                  progressBar: true,
                }
              );
              this.loadCompanies();
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
      });
    } else {
      console.log(
        `${this.translate.instant(
          'company-with-id'
        )} ${id} ${this.translate.instant('not-found')}`
      );
    }
  }
}
