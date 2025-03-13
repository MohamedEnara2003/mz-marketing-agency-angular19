import { Component,  effect,  signal, } from '@angular/core';
import { VideoBackgroundComponent } from "../components/video-background/video-background.component";
import { SharedModule } from '../../../shared/modules/shared.module';
import { IntroPopUpComponent } from "../components/intro-pop-up/intro-pop-up.component";


@Component({
  selector: 'app-home',
  imports: [VideoBackgroundComponent, SharedModule, IntroPopUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  videoBgFullScreen = signal<string>("https://res.cloudinary.com/mohamedenara/video/upload/v1741022702/m5cew4fmavn3szdkfcma.mp4").asReadonly();
  videoBgSmallScreen= signal<string>("https://res.cloudinary.com/mohamedenara/video/upload/v1741026248/bg-mobile_kqo2pi.mp4").asReadonly();
  innerWidth = signal<number>(window.innerWidth);
  isLoad = signal<boolean>(true)

  constructor(){
  effect(() => {
  this.innerWidth() > 640 ? this.isLoad.set(true) : this.isLoad.set(false)
  })

  }
}
