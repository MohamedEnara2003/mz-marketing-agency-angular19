import { Component, effect, output, signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ChatContainerComponent } from '../chat-container/chat-container.component';

@Component({
  selector: 'app-chat-form',
  imports: [SharedModule],
  template :`
  <form class="w-full flex justify-evenly items-center py-1" (ngSubmit)="sendMessage()">

  <div>
  <label for="fileKay">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-6 text-zinc-800 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
  <input type="file" name="file" id="fileKay" class="hidden" (change)="uploadFile($event)" accept="image/*" />
  </label>
  </div>

  <input  type="text"  [ngModel]="message()" (ngModelChange)="onChangeValue($event)" 
  name="massage" id="massage"
  class="w-[80%] md:w-[85%]  text-gray-900 placeholder:text-gray-500 input input-neutral focus:outline-mz-primary
  rounded-box bg-gray-50 border-transparent outline-gray-400 outline-2 " 
  placeholder="your massage..." 
  />

  <button type="submit" [disabled]="message().length <= 0 && !file ? true : false" >
  @if(message().length <= 0 && !file) {
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-6 text-zinc-800">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
  }@else {
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
  class="size-6 text-mz-primary cursor-pointer">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
  }
  </button>
  </form>
  `
})
export class ChatFormComponent {
  message = signal<string>('');
  postMessage = output<string>()
  file = output<File>()
  chatContainer = viewChild<ChatContainerComponent>(ChatContainerComponent);

  onChangeValue(value : string) : void  {
  this.message.set(value);
  }
  
  sendMessage () : void {
  this.postMessage.emit(this.message());
  this.message.set('');
  }

  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file.emit(file);
    }
  }


}
