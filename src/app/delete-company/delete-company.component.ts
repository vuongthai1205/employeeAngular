import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-company',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './delete-company.component.html',
  styleUrl: './delete-company.component.scss'
})
export class DeleteCompanyComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {company: any}) { }
  ngOnInit(): void {
    console.log(this.data.company)
  }
}
