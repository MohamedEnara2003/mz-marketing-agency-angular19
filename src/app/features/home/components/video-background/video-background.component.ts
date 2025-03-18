import { Component, input } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-video-background',
  imports: [SharedModule],
  template : `
  <video class="w-full h-full object-cover" [ngClass]="videoClass()"
  playsInline autoplay muted loop [poster]="videoPoster()">
  <source [src]="videoSrc()" type="video/mp4" >
  </video>
  `
})
export class VideoBackgroundComponent {
  videoSrc = input.required<string>() ;
  videoClass = input.required<string>() ;
  videoPoster = input.required<string>() ;
}
