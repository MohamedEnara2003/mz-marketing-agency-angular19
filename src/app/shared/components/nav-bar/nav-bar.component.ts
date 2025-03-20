import { Component,  OnInit, signal } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { fromEvent, map, pairwise} from 'rxjs';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-nav-bar',
  imports: [LinksComponent , SharedModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
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
