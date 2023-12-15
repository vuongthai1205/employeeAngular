import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
})
export class ViewEmployeeComponent implements OnInit {
  goHome() {
    this.router.navigate(["/"])
  }
  employeeId: any;
  employeeDetail: any = [];
  constructor(public restApi: RestApiService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.getEmployeeDetailById();
  }
  getEmployeeDetailById() {
    this.restApi.getEmployee(this.employeeId).subscribe({
      next: (res: any) => {
        this.employeeDetail = res.data
      }
      ,error: (err) => {
        console.log(err)
      }
    })
  }
}
