import { Component, effect, ElementRef, input, signal, viewChild} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-category-view',
  imports: [SharedModule],
  template : `
  @switch (type()) {
  @case ("video") {
    <video 
    *ngIf="src()"
    #videoElement 
    [src]="src()" 
    [class]="categoryClass()"
    [controls]="controls()"
    [muted]="muted()"
    [autoplay]="autoplay()"
    >
    </video>
  }
  @case ("image") {
  <img
  *ngIf="src()"
  [src]="src()" 
  [class]="categoryClass()"
  alt="image design"
  >
  }
  }
  `
})
export class CategoryViewComponent {
  src = input.required<string | SafeResourceUrl>();
  type = input.required<string>();
  categoryClass = input<string>();
  controls = input<boolean>();
  autoplay = input<boolean>();  
  muted = input<boolean>();
  

  videoElement  = viewChild<ElementRef<HTMLVideoElement>>('videoElement') ;
  duration = signal<number>(0);

  constructor(){
  effect(() => {
  this.accessToVideoDuration ()
  })
  }

  private accessToVideoDuration () : void {
    const videoRef = this.videoElement()?.nativeElement ;
    if(videoRef){
    videoRef.onloadedmetadata = () => {
    this.duration.set(videoRef.duration)
    }
    }
  }
  
  
}
