import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoCustomService {

  videoElement : HTMLVideoElement ;
  isPlaying =  signal<boolean>(true);
  currentTime = signal<number>(0);
  duration = signal<number>(0);
  
  private isSeek = signal<boolean>(false);

  getVideoElement (video : HTMLVideoElement) : void {
  this.videoElement = video;
  }

  play () : void{
  this.videoElement.play();
  this.isPlaying.set(true) ;
  }

  pause () : void{
  this.videoElement.pause();
  this.isPlaying.set(false);
  }
  
  togglePlay () : void {
  if(this.videoElement){
  this.videoElement.paused ? this.play() : this.pause();
  }
  }

  onTimeUpDate () : void {
  this.currentTime.set(this.videoElement.currentTime!)
  }

  loadedmetadata() : void {
    this.duration.set(this.videoElement.duration)
  }

  seek(time: number) : void {
  this.videoElement.currentTime = time
  }

}
