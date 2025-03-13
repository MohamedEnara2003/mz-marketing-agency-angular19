import { Component, inject, input, OnInit, signal } from '@angular/core';
import { LinksService } from '../../../core/services/links.service';
import { NavLinks } from '../../interfaces/shared';
import { SharedModule } from '../../modules/shared.module';


@Component({
  selector: 'app-links',
  imports: [SharedModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent implements OnInit{

  ulClass = input<string>() ;
  linksClass = input<string>() ;
  iconClass = input<string>() ;
  styleActiveClass = input.required<string>() ;
  showIcon = input.required<boolean>() ;
  links = signal<NavLinks[]>([]);
  private linksServices = inject(LinksService) ;

  ngOnInit(): void {
  this.getLinks() ;
  }

  getLinks() : void  {
  this.links.set(this.linksServices.navLinks);
  }
}
