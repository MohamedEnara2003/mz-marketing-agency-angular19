import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal, viewChild } from '@angular/core';
import {  MessageType } from '../../interface/chat.interface';
import { SharedModule } from '../../../shared/modules/shared.module';
import { DayJsService } from '../../../categories/service/day-js.service';


@Component({
  selector: 'app-chat-container',
  imports: [SharedModule],
  schemas : [CUSTOM_ELEMENTS_SCHEMA] ,
  template : `
  <section #chatContainer 
  class=" w-full  h-[80vh] overflow-y-auto bg-space2 border-2 border-mz-secound" 
  style="scrollbar-width: none;">
  @for (value of messagesData(); track value.id) {
  <div class="chat px-2"
  [ngClass]="value.isSender ? 'chat-end' : 'chat-start'">
  @defer (on viewport) {
  <div  class="chat-bubble  animate-up text-sm text-zinc-50 shadow-xl shadow-black"
  [ngClass]="value.isSender ? 'bg-mz-primary' : 'bg-zinc-700 '">
  
  <img *ngIf="value.image_url" [src]="value.image_url" [alt]="value.image_url"
  class="w-62 my-1 ">

  <p *ngIf="value.message !== ''" > {{value.message}} </p>
  
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

  </section>
  `
})

export class ChatContainerComponent {

  messagesData = input<MessageType[]>();

  chatContainer = viewChild<ElementRef<HTMLElement>>('chatContainer');

  isLoadImage = signal<boolean>(true);

  constructor(
  private dayjsService : DayJsService ,
  ) {};

  formatTime(timestamp : string) : string {
  return this.dayjsService.formatTime(timestamp);
  }
  
  }

