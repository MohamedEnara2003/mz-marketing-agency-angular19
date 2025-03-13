import { Component,  effect,  ElementRef,  signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ActivatedRoute } from '@angular/router';
import { combineLatest,  switchMap } from 'rxjs';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoInteractionComponent } from "./components/video-interaction/video-interaction.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { DetailsAsideComponent } from "./components/details-aside/details-aside.component";
import { VideoPlayerControlComponent } from "../video-player-control/video-player-control.component";
import { VideoCustomService } from '../../service/video-custom.service';


@Component({
  selector: 'app-category-details',
  imports: [
    SharedModule, VideoInteractionComponent, CommentsComponent, DetailsAsideComponent,
    VideoPlayerControlComponent
],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {

  categoryDataById = signal<CategoriesType | null>(null);
  catagoryParameter = signal<string>('');
  queryId = signal<number>(0);
  videoUrl = signal<SafeResourceUrl>('');


  videoDetailsRef = viewChild<ElementRef<HTMLVideoElement>>('videoDetailsRef') ;

  currentTime = signal<number>(0);
  duration = signal<number>(0);
  isPlaying = signal<boolean>(true);

  constructor(
  private activtedRoute : ActivatedRoute ,
  private categoriesService : CategoriesService,
  private sanitizer : DomSanitizer,
  private videoCustomService : VideoCustomService
  ){
  effect(() => {
  this.initVideoCustomService ()
  })
  this.initSubscription ()
  }

  private initSubscription () : void {
  combineLatest([ this.activtedRoute.paramMap, this.activtedRoute.queryParamMap]).pipe(
  switchMap(([paramMap ,queryParamsMap]) => {
  const category = paramMap.get('category')!;
  const id = +queryParamsMap.get('id')!;
  this.catagoryParameter.set(category);
  this.queryId.set(id);
  return this.categoriesService.getCategoryById(id)
  }),
  takeUntilDestroyed()
  ).subscribe({
  next : (value) => {
  this.categoryDataById.set(value);
  this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(value.url));
  },
  error : (err) => {
  console.log(err);
  },
  complete : () => {}
  })
  }

  private initVideoCustomService () : void {
  const videoRef = this.videoDetailsRef()?.nativeElement;
  if(videoRef){
  this.videoCustomService.getVideoElement(videoRef)
  }
  }

  onSliderChange(newTime : number) : void {
  this.videoCustomService.seek(newTime);
  }

  onTimeUpDate () : void {
  this.videoCustomService.onTimeUpDate();
  this.currentTime.set(this.videoCustomService.currentTime())
  }

  loadVideoDuration () : void {
  this.videoCustomService.loadedmetadata();
  this.duration.set(this.videoCustomService.duration())
  }

  playPause(isVideoState : boolean) : void {
  this.videoCustomService.isPlaying.set(isVideoState);
  this.videoCustomService.togglePlay();
  this.isPlaying.set(this.videoCustomService.isPlaying());
  }
  
  onVideoClick () : void {
  this.playPause(!this.isPlaying());
  }

}

