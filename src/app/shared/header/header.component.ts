import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserStorageService } from '../browser-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,

    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() drawer: any;
  constructor(
    public translate: TranslateService,
    public storage: BrowserStorageService
  ) {
    translate.addLangs(['en', 'vn', 'jp', 'kr']);
    translate.setDefaultLang(this.storage.get('language') || 'en');
  }
  languageChange = (key: any) => {
    this.translate.use(key.value);
    this.storage.set('language', key.value);
  };
}
