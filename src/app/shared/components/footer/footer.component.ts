import { Component, OnInit, signal} from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { FooterService } from './service/footer.service';
import { FooterLinks, SocialMedia } from '../../../core/models/footer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  layoutHide = signal<boolean>(false) 
  links = signal<FooterLinks[]>([]);
  socialMedia = signal<SocialMedia[]>([]);

  constructor(
  private router : Router,
  private route : ActivatedRoute ,
  private footerService : FooterService
  ){
  this.getRouteChildData();
  }

  ngOnInit(): void {
  this.getLinks()
  }

  private getRouteChildData() : void {
  this.router.events.pipe(takeUntilDestroyed()).subscribe(_ => {
  this.layoutHide.set(this.route.snapshot.firstChild?.data['layoutHide']);
  });
  }
  private getLinks () : void {
  this.links.set(this.footerService.footerLinks());
  this.socialMedia.set(this.footerService.footerSocialMedia())
  }
}
