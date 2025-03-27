import { Component,  effect,  OnInit, signal} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { AstronautImageComponent } from "../components/astronaut-image/astronaut-image.component";
import { OurServicesComponent } from "../components/our-services/our-services.component";
import { AboutService } from '../service/about.service';
import { OurServiceData } from '../interface/about';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { GsapService } from '../../../core/services/gsap.service';


@Component({
  selector: 'app-about',
  imports: [SharedModule, OurServicesComponent, LoadingComponent, AstronautImageComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit  {

  ourServicesData = signal<OurServiceData[]>([]) ;
  constructor(
  private aboutService : AboutService,
  private gsapService : GsapService
  
){
  effect(() => {
  this.animateSection();
  })
}

  ngOnInit(): void {
  this.getOurServices () ;
  } 
  
  private animateSection () : void {
    this.gsapService.gsap.fromTo(
      ".astronaut-component",
      { y : -100  ,opacity: 0 ,duration: 1}, 
      { y : 0  ,opacity: 1, duration: 1, ease: "power2.out" }
  );
  }

  private getOurServices () : void {
  this.ourServicesData.set(this.aboutService.ourServicseData())
  }
}
