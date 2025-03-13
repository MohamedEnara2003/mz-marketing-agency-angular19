import { Component, effect,  input,  signal } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-selection-translate',
  imports: [SharedModule],
  templateUrl: './selection-translate.component.html',
  styleUrl: './selection-translate.component.css'
})
export class SelectionTranslateComponent {
  
  selectLangClass = input<string>()
  currentLanguage = signal<string>('');

  otherLanguage = signal<{name : string , value : string}>(
  {name : 'arabic' , value : 'ar'}
  );

  isSelect = signal<boolean>(false);
  
  constructor(
  private languageService : LanguageService,
  ){
    effect(() => {     
    this.currentLanguage.set(
      this.languageService.currentLanguage() === 'ar' ?  'arabic' : 'english'
    );
    this.initOtherLanguage();
    })
  }

  initSelect() : void {
  this.isSelect.set(!this.isSelect()) ;
  }

  selectLang(lang : string ) : void {
  this.languageService.onChangeLanguage(lang) ;
  this.initSelect();
  }
  
  initOtherLanguage() : void {
    this.otherLanguage.set({
      name :   this.languageService.currentLanguage() === 'ar' ? 'english' : 'arabic' ,
      value:   this.languageService.currentLanguage() === 'ar' ? 'en' : 'ar'
  });
  }
}
