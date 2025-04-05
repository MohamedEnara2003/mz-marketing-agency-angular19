import { Component,  effect,  ElementRef,  Inject,  input,  signal, viewChild } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { LogoComponent } from "../logo/logo.component";
import { UserComponent } from "../user/user.component";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../modules/shared.module';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { DOCUMENT } from '@angular/common';
import { NavLinks } from '../../interfaces/shared';
import { LinksService } from '../../../core/services/links.service';

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

    layoutHide = signal<boolean>(false) ;
    fixedHeader = signal<boolean>(false) ;
    toggleRef = viewChild<ElementRef<HTMLInputElement>>('toggleRef') ;
    links = signal<NavLinks[]>([]) ;
    
    constructor(
    private linksServices : LinksService ,
    private router : Router ,
    private route : ActivatedRoute ,
    @Inject(DOCUMENT) private document : Document
    ){
    this.getRouteChildData() ;
    this.document.body.classList.add('bg-space')
    }

    ngOnInit(): void {
      this.getLinks() ;
    }

    private getRouteChildData() : void {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(_ => {
    this.fixedHeader.set(this.route.snapshot.firstChild?.data['headerHide']);
    this.layoutHide.set(this.route.snapshot.firstChild?.data['layoutHide']);
    });
    }
    
    onChanheToggle() : void {
    const checkbox = this.toggleRef()?.nativeElement!;
    const bodyClass =  this.document.body.classList ;
    const bg = ['bg-gradient-to-br','from-[#131111]','to-[#080808]'];
    bg.forEach((item) => {
      bodyClass.add(checkbox.checked ?'bg-space' : item)
      bodyClass.remove(checkbox.checked ? item : 'bg-space')
    })
    }
  private getLinks() : void  {
    this.links.set(this.linksServices.navLinks);
  }
}
