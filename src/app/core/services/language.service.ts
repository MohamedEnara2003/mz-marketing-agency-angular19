import { Inject,  Injectable, signal } from '@angular/core';
import { LocaleStorgeService } from './locale-storge.service';
import { DOCUMENT } from '@angular/common';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly languageKay : string = "lang" ;
  private readonly defualtLangKey : string = 'en' ;
  private html : HTMLElement ;
  currentLanguage = signal<string>('');
  
  constructor(
  private translationService : TranslationService ,
  private localeStorgeSerives : LocaleStorgeService,
  @Inject(DOCUMENT) private document : Document ,
  ){
    this.html = this.document.getElementsByTagName('html')[0];
    this.currentLanguage.set(this.localeStorgeSerives.getItem(this.languageKay)  || this.defualtLangKey );
  }


  initSetDefaultLanguage() : void {
  this.translationService.setDefaulteLanguage(this.currentLanguage());
  this.setLanguage(this.currentLanguage());
  }
  
  onChangeLanguage(lang : string) : void {
  this.setLanguage(lang);
  }
  
    private setLanguage(lang : string) : void {
    this.currentLanguage.set(lang);
    this.localeStorgeSerives.setItem(this.languageKay, lang) ;
    this.translationService.use(lang);
    this.updateLayout();
    }
  
    private updateLayout() : void {
    this.html.lang = this.currentLanguage();
    this.document.body.dir = this.getDirection() ;
    }
    
    private getDirection() : string {
    return this.currentLanguage() === this.defualtLangKey ? 'ltr' : 'rtl' ;
    }




}
