import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleStorgeService {

  getItem(kay : string ) : string | null {
  return localStorage.getItem(kay);
  }

  setItem(kay : string , value : string) : void {
  localStorage.setItem(kay , value);
  }
  removeItem(kay : string) : void {
  localStorage.removeItem(kay);
  }
 
}
