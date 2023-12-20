import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-view-company',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './view-company.component.html',
  styleUrl: './view-company.component.scss'
})
export class ViewCompanyComponent implements OnInit {
goHome() {
  this.router.navigate(["/list-company"])
}
  ngOnInit(): void {
    this.companyId = this.route.snapshot.params["id"];
    this.getCompanyById()
  }
  companyId :any
  companyDetail: any = []
  constructor(private restApi : RestApiService, private route: ActivatedRoute, private router: Router){}
  getCompanyById = () => {
    this.restApi.getCompany(this.companyId).subscribe({
      next: (res : any) => {
        this.companyDetail = res.data
      },
      error : (err) => {
        console.log(err)
      }
    })
  }
}
