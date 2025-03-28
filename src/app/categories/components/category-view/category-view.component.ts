import { Component, ElementRef, input, signal, viewChild} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-category-view',
  imports: [SharedModule],
  template : `

  @switch (options().type) {
  @case ("video") {
    <video 
    *ngIf="options().src"
    #videoElement 
    [src]="options().src" 
    [poster]="options().poster"
    [class]="options().class"
    playsInline
    [controls]="options().controls"
    [muted]="options().muted"
    [autoplay]="options().autoplay"
    (loadedmetadata)="accessToVideoDuration()"
    (timeupdate)="accessToVideoCurrentTime()"
    >
    </video>
  }
  @case ("image") {
  <img
  *ngIf="options().src"
  [src]="options().src" 
  [class]="options().class"
  alt="image design"
  loading="lazy"
  >
  }
  }

  `
})
export class CategoryViewComponent {

  options = input.required<{
  src : string | SafeResourceUrl ,
  type : string ,
  class? : string ,
  controls?: boolean ,
  autoplay?  : boolean ,
  muted? : boolean ,
  poster? : string ,
  }>()

  videoElement  = viewChild<ElementRef<HTMLVideoElement>>('videoElement') ;
  duration = signal<number>(0);
  currentTime = signal<number>(0);
  
  get videoRef() : HTMLVideoElement {
    return this.videoElement()?.nativeElement! 
  }
  
  accessToVideoDuration () : void {
    if(this.videoRef){
    this.duration.set(this.videoRef.duration)
    }
  }
  
  accessToVideoCurrentTime () : void {
    if(this.videoRef){
    this.currentTime.set(this.videoRef.currentTime)
    }
  }
  
}
