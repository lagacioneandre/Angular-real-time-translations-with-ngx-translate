import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ILanguageOption } from './interfaces/language-option.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly availableLanguages = ['english', 'pt', 'es', 'french'];
  private readonly translateService = inject(TranslateService);
  private readonly translatePipe = inject(TranslatePipe);
  languageOptions: ILanguageOption[] = [];
  textTranslatedByPipe = '';

  ngOnInit(): void {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('english');
    this.buildLanguageOptions();
  }

  private buildLanguageOptions() {
    const ENGLISH =  this.translateService.get('ENGLISH');
    const PORTUGUESE = this.translateService.get('PORTUGUESE');
    const SPANISH = this.translateService.get('SPANISH');
    const FRENCH = this.translateService.get('FRENCH');

    forkJoin([
      ENGLISH,
      PORTUGUESE,
      SPANISH,
      FRENCH
    ]).subscribe(
      _response => {
        this.languageOptions = [{
          value: this.availableLanguages[0],
          label: _response[0],
        }, {
          value: this.availableLanguages[1],
          label: _response[1],
        }, {
          value: this.availableLanguages[2],
          label: _response[2],
        }, {
          value: this.availableLanguages[3],
          label: _response[3],
        }];
        this.textTranslatedByPipe = this.translatePipe.transform('TRANSLATED_BY_COMPONENT');
      }
    );

    
    
  }

  changeLanguage(language: ILanguageOption) {
    this.translateService.use(language.value);
    this.textTranslatedByPipe = this.translatePipe.transform('TRANSLATED_BY_COMPONENT');
  }
  
}
