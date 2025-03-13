import { Component,  signal } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { LogoComponent } from "../logo/logo.component";
import { UserComponent } from "../user/user.component";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../modules/shared.module';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-header',
  imports: [
    LinksComponent,
    LogoComponent,
    UserComponent,
    SharedModule,
    NavBarComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


    hidelayout = signal<boolean>(true) ;
    
    constructor(
    private router : Router ,
    private route : ActivatedRoute ,
    ){
    this.getRouteChildData() ;
    }
  
    getRouteChildData() : void {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
    this.hidelayout.set(this.route.snapshot.firstChild?.data['hidelayout']) ;
    });
    }
}
