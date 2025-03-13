import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translateServices : TranslateService){}
  

  setDefaulteLanguage(lang : string) : void {
  this.translateServices.setDefaultLang(lang)
  }

  use(lang : string) : void {
  this.translateServices.use(lang)
  }
  
}
