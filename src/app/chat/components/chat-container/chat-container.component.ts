import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import {  MessageType } from '../../interface/chat.interface';
import { SharedModule } from '../../../shared/modules/shared.module';
import { DayJsService } from '../../../categories/service/day-js.service';

@Component({
  selector: 'app-chat-container',
  imports: [SharedModule],
  template : `
  <section #chatContainer 
  class="w-full h-[50vh] md:h-[70vh] overflow-y-auto bg-gray-50" style="scrollbar-width: none;">
  @for (value of messagesData(); track value.id) {
  <div class="chat"
  [ngClass]="value.isSender ? 'chat-end' : 'chat-start'">

  <div class="chat-bubble"
  [ngClass]="value.isSender ? 'bg-mz-secound' : 'bg-zinc-800'">

  <p class="text-gray-50 text-sm">
  {{value.message}}
  </p>

  <div class="flex justify-end items-end gap-1">
  <small class="text-[10px]  text-green-300">{{formatTime(value.created_at!)}}</small>
  <i class="fa-solid fa-check-double text-blue-500 text-xs"></i>
  </div>

  </div>
  </div>
  }
  </section>
  `
})
export class ChatContainerComponent {
  messagesData = input<MessageType[]>();
  chatContainer = viewChild<ElementRef<HTMLElement>>('chatContainer');
  constructor(private dayjsService : DayJsService){};

 
  formatTime(timestamp : string) : string {
  return this.dayjsService.formatTime(timestamp);
  }
}
