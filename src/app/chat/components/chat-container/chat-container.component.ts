import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal, viewChild } from '@angular/core';
import {  MessageType } from '../../interface/chat.interface';
import { SharedModule } from '../../../shared/modules/shared.module';
import { DayJsService } from '../../../categories/service/day-js.service';
import { LocaleStorgeService } from '../../../core/services/locale-storge.service';


@Component({
  selector: 'app-chat-container',
  imports: [SharedModule],
  schemas : [CUSTOM_ELEMENTS_SCHEMA] ,
  template : `
  <section #chatContainer 
  class=" w-full  h-[77vh] overflow-y-auto bg-[#eee]" style="scrollbar-width: none;">
  @for (value of messagesData(); track value.id) {
  <div class="chat px-2"
  [ngClass]="value.isSender ? 'chat-end' : 'chat-start'">
  @defer (on viewport) {
  <div  class="chat-bubble animate-up"
  [ngClass]="value.isSender ? 'bg-mz-secound' : 'bg-zinc-800'">
  
  <img *ngIf="value.image_url" [src]="value.image_url" [alt]="value.image_url"
  class="w-60 my-1">

  <p *ngIf="value.message !== ''" class="text-gray-50 text-sm ">
  {{value.message}}
  </p>
  
  <div class="flex justify-end items-end gap-1">
  <small class="text-[10px]  text-green-300">{{formatTime(value.created_at!)}}</small>
  <i class="fa-solid fa-check-double text-blue-500 text-xs"></i>
  </div>

  </div>
}@placeholder {
  <div class="chat-bubble w-40 h-10 my-1  bg-zinc-500 animate-pulse"> </div>
}
  </div>
  }@empty {
    <div class="w-full h-full flex justify-center items-center">
    <app-loading />
    </div>
  }
<nav *ngIf="images().length > 0 && isLoadImage()" class="w-full h-40 absolute bottom-15 flex-col  
  flex justify-start items-center animate-up">

  <div (click)="removeAllImages()" class="w-full flex justify-end items-end ">
  <i class="fa-solid fa-close p-3 text-gray-50 text-xl z-20 cursor-pointer"></i>
  </div>

  <swiper-container
*ngIf="images()"
#swiperRef
slides-per-view="4"
[breakpoints]="{
      '0':   { spaceBetween: 0, slidesPerView: 2 },
      '370': { spaceBetween: 0, slidesPerView: 2 },
      '540': { spaceBetween: 0, slidesPerView: 3 },
      '1024':{ spaceBetween: 0, slidesPerView: 4 },
      '1536':{ spaceBetween: 0, slidesPerView: 5 }
    }"
[speed]="200"
class="w-[90%]" >
    @for (url of images(); track url) {
    <swiper-slide class="w-20 h-20 flex justify-center items-center">
      
      <img [src]="url" alt="Image 1" class="shadow-md shadow-black z-10 w-[80%] h-full 
      object-cover rounded-box border-1 border-mz-primary bg-zinc-400 animate-up" />

  <div *ngIf="!url" class="w-[80%] h-full shadow-md shadow-black border-1 border-mz-primary rounded-box
  flex justify-center items-center bg-zinc-400 ">
  <span class=" loading loading-spinner w-12 text-mz-primary "></span>
  </div>
    </swiper-slide>
  }
</swiper-container>
<div class="w-full absolute h-full bg-black left-0 bottom-0 opacity-70 z-0"></div>
</nav>

  </section>
  `
})

export class ChatContainerComponent {
  private readonly ImagesFilesKay = 'ImagesFilesKay' ;
  messagesData = input<MessageType[]>();
  images  = input<string[]>([]);  
  chatContainer = viewChild<ElementRef<HTMLElement>>('chatContainer');

  isLoadImage = signal<boolean>(true);

  constructor(
  private dayjsService : DayJsService ,
  private localeStorageService : LocaleStorgeService,
  ) {};

  formatTime(timestamp : string) : string {
  return this.dayjsService.formatTime(timestamp);
  }
  
  removeAllImages() : void {
  this.isLoadImage.set(false);
  this.localeStorageService.setItem(this.ImagesFilesKay , JSON.stringify([]));
  }

  }

