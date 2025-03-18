import { Component,  effect,  ElementRef,  Inject,  input,  signal, viewChild } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { LogoComponent } from "../logo/logo.component";
import { UserComponent } from "../user/user.component";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../modules/shared.module';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { DOCUMENT } from '@angular/common';

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

    hidelayout = signal<boolean>(false) ;

    toggleRef = viewChild<ElementRef<HTMLInputElement>>('toggleRef') ;

    constructor(
    private router : Router ,
    private route : ActivatedRoute ,
    @Inject(DOCUMENT) private document : Document
    ){
    this.getRouteChildData() ;
    this.document.body.classList.add('bg-space')
    }
  
    private getRouteChildData() : void {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
    this.hidelayout.set(this.route.snapshot.firstChild?.data['headerHide']) ;
    });
    }
    
    onChanheToggle() : void {
    const checkbox = this.toggleRef()?.nativeElement!;
    const bodyClass =  this.document.body.classList ;
    bodyClass.add(checkbox.checked ?'bg-space' : 'bg-black')
    bodyClass.remove(checkbox.checked ?'bg-black' : 'bg-space')
    }
}
