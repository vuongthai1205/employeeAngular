import { Component, Inject, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
})
export class ViewEmployeeComponent implements OnInit {
  employeeId: any;
  employeeDetail: any = [];
  constructor(
    public restApi: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ViewEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {employee: any},
  ) {}
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    // this.getEmployeeDetailById();
    this.employeeDetail = this.data.employee
  }
  // getEmployeeDetailById() {
  //   this.restApi.getEmployee(this.employeeId).subscribe({
  //     next: (res: any) => {
  //       this.employeeDetail = res.data
  //     }
  //     ,error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
}
