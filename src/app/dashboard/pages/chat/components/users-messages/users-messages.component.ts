import { Component, input } from '@angular/core';
import { ChatType } from '../../../../../chat/interface/chat.interface';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-users-messages',
  imports: [SharedModule],
  template  : `
  <nav class="w-full h-full bg-gray-100 flex flex-col justify-start items-center ">

  <header class="w-full flex flex-col justify-center items-start p-3 gap-2 ">
  <button class="size-5 bg-mz-secound rounded-full cursor-pointer"> 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-gray-50">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
  </button>
    <h1 class="text-2xl font-bold capitalize text-black">users chat</h1>
      <label class="w-full input bg-gray-50 border-b-2 border-mz-primary">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
      <input type="search" class="grow " placeholder="Search" />
      </label>
  </header> 

<ul class="w-full h-full overflow-y-auto" style="scrollbar-width: none;">
@for (chat of  chats(); track chat.id) {
<li [routerLink]="['/dashboard/chat', chat.id]"  [queryParams]="{'receiver-id' : chat.user_id}"
class="cursor-pointer flex justify-start items-center gap-2 px-4 p-1 my-2">
    <div class="size-10  rounded-full">
        <img *ngIf="chat.avatar_url" class="rounded-full"
        alt="user image"
        [src]="chat.avatar_url" />
    </div>
    <span class="capitalize text-mz-secound font-[500]">{{chat.userName}}</span>
</li>
}
</ul>

</nav>
  `
})
export class UsersMessagesComponent {
  chats = input.required<ChatType[]>();
  
}
