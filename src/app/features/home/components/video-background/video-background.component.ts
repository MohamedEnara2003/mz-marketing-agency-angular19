import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-video-background',
  imports: [SharedModule, LoadingComponent],
  template : `
  @if (videoClass()) {
  <video #introVideoRef 
  class="w-full h-full object-cover" [ngClass]="videoClass()"
  playsInline autoplay muted loop [poster]="videoPoster()">
  <source [src]="videoSrc()" type="video/mp4" >
  </video>
  }@else {
  <app-loading />
  }
  `
})
export class VideoBackgroundComponent implements OnInit{
  videoSrc = input.required<string>() ;
  videoClass = input.required<string>() ;
  videoPoster = input.required<string>();
  introVideoRef = viewChild<ElementRef<HTMLVideoElement>>('introVideoRef');

  ngOnInit(): void {
  this.initVideoIntro()
  }

  private initVideoIntro() : void  {
  const video = this.introVideoRef()?.nativeElement ;
  if(video) {
  video.play();
  }
  }
}
