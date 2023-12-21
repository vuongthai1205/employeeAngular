import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatTooltipModule,
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
    private translate: TranslateService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.dataSource = new MatTableDataSource(this.companyList);
  }
  displayedColumns: string[] = ['Id', 'Name', 'Address', 'Actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  ngOnInit(): void {
    this.loadCompanies();
  }
  loadCompanies() {
    return this.restApi.getCompanies().subscribe({
      next: (res: any) => {
        this.companyList = res.data;
        this.dataSource = new MatTableDataSource(this.companyList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDialogDelete(id: any) {
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
