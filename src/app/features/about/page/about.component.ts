import { Component, inject, OnInit, signal} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { AstronautImageComponent } from "../components/astronaut-image/astronaut-image.component";
import { OurServicesComponent } from "../components/our-services/our-services.component";
import { AboutService } from '../service/about.service';
import { OurServiceData } from '../interface/about';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";


@Component({
  selector: 'app-about',
  imports: [SharedModule, AstronautImageComponent, OurServicesComponent, LoadingComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations : [
  trigger('translate-content' , [
  state('hidden', style({ transform: 'translateX(-100%)', opacity: 0 })),
  state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
  transition('hidden <=> visible', animate('0.5s ease-in-out'))
  ])
  ]
})
export class AboutComponent implements OnInit {
  private aboutService = inject(AboutService)
  ourServicesData = signal<OurServiceData[]>([]) ;
  
  protected contentState : 'in-side'|'out-side' = "out-side";


  ngOnInit(): void {
  this.getOurServices () ;
  } 

  private getOurServices () : void {
  this.ourServicesData.set(this.aboutService.ourServicseData())
  }
}
