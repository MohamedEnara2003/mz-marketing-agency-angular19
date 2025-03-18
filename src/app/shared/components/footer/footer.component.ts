import { Component, OnInit, signal} from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { FooterService } from './service/footer.service';
import { FooterLinks, SocialMedia } from '../../../core/models/footer.model';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  links = signal<FooterLinks[]>([])
  socialMedia = signal<SocialMedia[]>([])
  constructor(
  private footerService : FooterService
  ){}

  ngOnInit(): void {
  this.getLinks()
  }
  
  private getLinks () : void {
  this.links.set(this.footerService.footerLinks());
  this.socialMedia.set(this.footerService.footerSocialMedia())
  }
}
