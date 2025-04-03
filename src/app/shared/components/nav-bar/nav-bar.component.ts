import { Component,  OnInit, signal } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { fromEvent, map, pairwise} from 'rxjs';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-nav-bar',
  imports: [LinksComponent , SharedModule],
  template : `
  <nav *ngIf="isScroll()" class="animate-up w-full fixed bottom-0  z-10  bg-gray-100  
    shadow-md shadow-black ">
    <app-links
    [showIcon]="true"
    linksClass="flex flex-col justify-center items-center z-12 text-gray-900 
    xs:w-18 sm:w-22 hover:bg-mz-primary hover:rounded-t-md  py-1 mx-1 duration-200
    cursor-pointer hover:text-gray-50 "
    styleActiveClass="bg-mz-primary text-white rounded-t-md "
    />

</nav>
  `
})
export class NavBarComponent implements OnInit{
  
  isScroll = signal<boolean>(true);

  ngOnInit(): void {
  this.initNavLoading()
  }

  private initNavLoading() : void {
  fromEvent(window , 'scroll').pipe(
  map(() => window.scrollY),
  pairwise()
  ).subscribe(([a , b]) =>  {
  this.isScroll.set(a > b || a < 50 && b < 50 ? true : false);
  })

  
  }
}
