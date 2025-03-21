import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { OurServiceData } from '../interface/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  ourServicseData = signal<OurServiceData[]>([
  {
  id : 1 , 
  title : "titleReels",
  paragraph : "p-Reels",
  list : [
  "reelsOne",
  "reelsTwo",
  "reelsthree",
  ]
  },
  {
  id : 2 , 
  title : "titleUxUi",
  paragraph : "p-UxUi",
  list : [
  "UxUiOne",
  "UxUiTwo",
  "UxUithree",
  ]
  },
  {
  id : 3 , 
  title : "titleDesign",
  paragraph : "p-Design",
  list : [
  "DesignOne",
  "DesignTwo",
  "Designthree",
  ]
  },
  {
  id : 4 , 
  title : "titleWebMobileApp",
  paragraph : "p-WebMobileApp",
  list : [
  "WebMobileAppOne",
  "WebMobileAppTwo",
  "WebMobileAppthree",
  ]
  },
  ])
}
