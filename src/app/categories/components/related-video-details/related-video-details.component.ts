import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { CategoryViewComponent } from '../category-view/category-view.component';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { SharedModule } from '../../../shared/modules/shared.module';
import { timer } from 'rxjs';
import { CategoryState } from '../../reducers/reducers.action';
import { select, Store } from '@ngrx/store';
import { categoriesActions } from '../../reducers/action-types';
import { selectCategory } from '../../reducers/category.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-related-video-details',
  imports: [CategoryViewComponent , SharedModule],
  template : `
    @if(categoryById() !== undefined && categoryById()?.type === 'video'){ 
    <aside #asideElement 
    (click)="playPauseRelatedVideoDetails()"
    (mouseenter)="isShadow.set(true)" 
    (mouseleave)="isShadow.set(false)"
    class="fixed animate-moveZ right-2  lg:right-7 bottom-14 lg:bottom-10 rounded-2xl  z-20 shadow-md shadow-black
    flex justify-center items-center  border-1 border-mz-primary rounded-box"
    >

    <ul  *ngIf="isShadow()"
    class="absolute w-[90%] h-[85%] flex justify-between gap-4 items-start  z-30 ">

    <li (click)="closeModle()" 
        routerLink="/categories" [queryParams]="{id : null}" queryParamsHandling="merge">
        <a> <i class="cursor-pointer fa-solid fa-close text-white text-xl"></i></a>
        </li>

        <li routerLink="/categories/watch" [queryParams]="{id : categoryById()?.id }"  
        queryParamsHandling="merge">
        <a> <i class="cursor-pointer fa-solid fa-up-right-from-square text-white text-xl"></i></a>
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
        'w-[240px] h-[350px] object-cover rounded-box animate-down' :
        'h-[220px] w-[320px] sm:w-[350px] object-cover rounded-box animate-down',
        autoplay : true
        }" />
    
    <div *ngIf="isShadow()" class="w-full h-full absolute left-0 top-0 bg-black opacity-70 z-20"></div>
</aside>
}
  `
})
export class RelatedVideoDetailsComponent {
  categoryById = signal<CategoriesType | undefined>(undefined)

  categoryViewComponent = viewChild<CategoryViewComponent>('categoryViewComponent');
  asideElement = viewChild<ElementRef<HTMLElement>>('asideElement') ;

  isShadow = signal<boolean>(false);
  isPlay = signal<boolean | null>(null);

  constructor(
  private store : Store<CategoryState>
  ){
    effect(() => {
      this.initIsPlay()
    })
  this.getCategoryById()  ;
  }
  
  private getCategoryById() : void {
  this.store.pipe(select(selectCategory)).pipe(
  takeUntilDestroyed(),
  ).subscribe({
  next : (value) => {
  this.categoryById.set(value) ;
  }
  })
  }

  closeModle() : void {
  this.categoryById.set(undefined)
  this.store.dispatch(categoriesActions.GetCategotyById({category : undefined}))
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
