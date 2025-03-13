import { Component, computed,  effect,  input, output, signal, ViewEncapsulation } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { SharedModule } from '../../../shared/modules/shared.module';


@Component({
  selector: 'app-video-player-control',
  imports: [NgxSliderModule , SharedModule],
  templateUrl: './video-player-control.component.html',
  styleUrl: './video-player-control.component.css',
  encapsulation : ViewEncapsulation.None
})
export class VideoPlayerControlComponent {
  currentTime = input.required<number>();
  duration = input.required<number>();

  options = computed<Options>(() => ({
    floor: 0,
    ceil: Math.floor(+this.duration()),
    step : 1 ,
    showTicksValues  : false ,
    showSelectionBar : true ,
    selectionBarGradient : {from : "#4C6793" , to : "#434F62"},
    
    getPointerColor : () => "#4C6793" ,
    })
  )
  value = output<number>();
  isPlaying = signal<boolean>(true)
  getVideoState = input.required<boolean>();
  postVideoState = output<boolean>();
  

  constructor(){
  effect(() => {
  this.isPlaying.set(this.getVideoState())
  })

  }

  onSliderChange(newTime : number) : void {
  this.value.emit(newTime);
  }
  
  playPause() : void {
  this.isPlaying.set(!this.isPlaying());
  this.postVideoState.emit(this.isPlaying());
  }
}

