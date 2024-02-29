import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  currentLanguage: string = 'en';
  constructor(
    private translate: TranslateService,
    private apiService: ApiService
  ) {
    this.translate.setDefaultLang('en');
  }

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
  }

  async setLanguage(): Promise<void> {
    const ipInfos = this.apiService.getIPInfo();
    const ipInfo = await lastValueFrom(ipInfos);
    const countryCode = ipInfo?.country_code?.toUpperCase();
    if (countryCode === 'BR' || countryCode === 'PT') {
      this.translate.setDefaultLang('pt');
      this.currentLanguage = 'pt';
    }
  }

  changeLanguage(language: string) {
    this.currentLanguage = ['en', 'pt'].includes(language) ? language : 'en'
    this.translate.use(this.currentLanguage);
  }
}
