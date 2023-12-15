import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss',
})
export class ListCompanyComponent implements OnInit {
  companyList = new Array();

  constructor(
    private route: Router,
    private restApi: RestApiService,
    private dialog: MatDialog,
    private toast: ToastrService
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
}
