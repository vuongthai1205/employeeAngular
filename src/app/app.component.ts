import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserStorageService } from './shared/browser-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'employee';
  constructor(
    public translate: TranslateService,
    public storage: BrowserStorageService
  ) {
    translate.addLangs(['en', 'vn', 'jp', 'kr']);
    translate.setDefaultLang(this.storage.get('language') || 'en');
  }
  ngOnInit(): void {
  }

  languageChange = (key: any) => {
    this.translate.use(key.value);
    this.storage.set('language', key.value);
  };
}
