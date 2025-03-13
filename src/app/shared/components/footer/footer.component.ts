import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent  implements OnInit{
  changeBg = signal<boolean>(false) ;
  hidelayout = signal<boolean>(true) ;
  
  constructor(
  private router : Router ,
  private route : ActivatedRoute ,
  ){}

  ngOnInit(): void {
  this.getRouteChildData();
  }

  getRouteChildData() : void {
    this.router.events.subscribe(event => {
    this.changeBg.set(this.route.snapshot.firstChild?.data['changeBg'] || false) ;
    this.hidelayout.set(this.route.snapshot.firstChild?.data['hidelayout']) ;
    });
  }
}
