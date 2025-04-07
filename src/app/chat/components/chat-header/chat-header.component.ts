import { Component, input } from '@angular/core';
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { SharedModule } from '../../../shared/modules/shared.module';
import { ChatType } from '../../interface/chat.interface';


@Component({
  selector: 'app-chat-header',
  imports: [LogoComponent , SharedModule],
  template : `
  <header class="bg-mz-secound text-white py-1 px-4 flex justify-between items-center ">  
  <div class="flex flex-wrap justify-center items-center gap-2 ">
        <a [routerLink]="pathCloseChat()">
        <i class="fa-solid fa-angle-left text-gray-50 cursor-pointer text-2xl"></i>
        </a>
      @if(!userData()){
        <h1 class="text-lg font-semibold mb-2">
        <app-logo logoClass="w-24" [isPath]="false"/>
        </h1>
        <div class="flex flex-col">
        <span class="capitalize text-xs sm:text-sm font-[500]">admin m&z marketing agency</span>
        <small class="text-[10px] sm:text-xs text-blue-400">active 1 min ago.</small>
        </div>
      }@else {
        <img [src]="userData()?.avatar_url" alt="user image" class="size-8 rounded-full" />
        <div class="flex flex-col">
        <span class="capitalize text-xs sm:text-sm font-[500]">{{userData()?.userName}}</span>
        <small class="text-[10px] sm:text-xs text-blue-400">active 1 min ago.</small>
        </div>
      }
  </div>
  </header>
  `
})
export class ChatHeaderComponent {
  pathCloseChat = input<string>('/');
  userData = input<ChatType>()
}
