import { Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { CategoryViewComponent } from '../category-view/category-view.component';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { SharedModule } from '../../../shared/modules/shared.module';
import { timer } from 'rxjs';
import { LocaleStorgeService } from '../../../core/services/locale-storge.service';

@Component({
  selector: 'app-related-video-details',
  imports: [CategoryViewComponent , SharedModule],
  template : `
    <aside #asideElement 
    (click)="playPauseRelatedVideoDetails()"
    (mouseenter)="isShadow.set(true)" 
    (mouseleave)="isShadow.set(false)"
    class="fixed animate-moveZ  right-5 bottom-10 rounded-2xl  z-20 shadow-md shadow-black
    flex justify-center items-center  border-1 border-mz-primary rounded-box">

    <ul  *ngIf="isShadow()"
    class="absolute w-[95%] h-[90%] flex justify-end gap-4 items-start  z-30 ">
        <li routerLink="/categories/watch"  queryParamsHandling="merge">
        <a> <i class="cursor-pointer fa-solid fa-up-right-from-square text-white text-xl"></i></a>
        </li>

        <li (click)="closeModle()" 
        routerLink="/categories" [queryParams]="{id : null}" queryParamsHandling="merge">
        <a> <i class="cursor-pointer fa-regular fa-rectangle-xmark text-white text-xl"></i></a>
        </li>

        <li 
        (click)="fullScreenRelatedVideoDetails()" class="absolute right-0 bottom-0">
        <a><i class="cursor-pointer fa-solid fa-expand text-white text-xl"></i>  </a>
        </li>
    </ul>

    <button *ngIf="isPlay() !== null" (click)="playPauseRelatedVideoDetails()" type="button" 
    class="animate-ping absolute bg-[#333] rounded-full size-14 text-center shadow-md shadow-black">
    <i class="fa-solid text-3xl text-white "
    [ngClass]="isPlay() ? 'fa-play' : 'fa-pause'"></i>
    </button>

        <app-category-view #categoryViewComponent
        [options]="{
        src : categoryById()?.url!,
        type : categoryById()?.type!,
        poster : categoryById()?.poster ,
        class : categoryById()?.category === 'reels' ? 
        'w-[240px] h-[340px] object-cover rounded-box animate-down' :
        'h-[220px] w-[350px] object-cover rounded-box animate-down',
        autoplay : true
        }" />
    
    <div *ngIf="isShadow()" class="w-full h-full absolute left-0 top-0 bg-black opacity-70 z-20"></div>
</aside>
  `
})
export class RelatedVideoDetailsComponent {
  categoryById = input.required<CategoriesType | null>()

  categoryViewComponent = viewChild<CategoryViewComponent>('categoryViewComponent');
  asideElement = viewChild<ElementRef<HTMLElement>>('asideElement') ;

  isShadow = signal<boolean>(false);
  isPlay = signal<boolean | null>(null);

  constructor(private localeStorgeService : LocaleStorgeService){
    effect(() => {
      this.initIsPlay()
    })
  }

  closeModle() : void {
  this.localeStorgeService.removeItem('VideoDetailsKay');
  }

  fullScreenRelatedVideoDetails() : void {
  const videoElement = this.categoryViewComponent()?.videoElement()?.nativeElement ;
  if(videoElement){
  videoElement.requestFullscreen();
  }
  }

  playPauseRelatedVideoDetails() : void {
  const videoElement = this.categoryViewComponent()?.videoElement()?.nativeElement ;
  if(videoElement){
  videoElement?.paused ? videoElement.play(): videoElement.pause() ;
  this.isPlay.set(videoElement.paused);
  }
  }
  private initIsPlay() : void {
    if(this.isPlay() || !this.isPlay()){
    timer(300).subscribe(() => this.isPlay.set(null))
    }
  }
}
