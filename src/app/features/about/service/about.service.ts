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
  paragraph : "p-reels",
  list : [
  "reelsOne",
  "reelsTwo",
  "reelsThree",
  ]
  },
  {
  id : 2 , 
  title : "titleUxUi",
  paragraph : "p-uxUi",
  list : [
  "uxUiOne",
  "uxUiTwo",
  "uxUiThree",
  ]
  },
  {
  id : 3 , 
  title : "titleDesign",
  paragraph : "p-design",
  list : [
  "designOne",
  "designTwo",
  "designThree",
  ]
  },
  {
  id : 4 , 
  title : "titleWebMobileApp",
  paragraph : "p-webMobileApp",
  list : [
  "webMobileAppOne",
  "webMobileAppTwo",
  "webMobileAppThree",
  ]
  },
  ])
}
