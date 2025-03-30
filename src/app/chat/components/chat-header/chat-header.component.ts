import { Component } from '@angular/core';
import { LogoComponent } from "../../../shared/components/logo/logo.component";


@Component({
  selector: 'app-chat-header',
  imports: [LogoComponent],
  template : `
  
  <header class="bg-mz-secound text-white py-1 px-4 flex justify-between items-center ">  

<div class="flex flex-wrap justify-center items-center ">
        <h1 class="text-lg font-semibold mb-2">
        <app-logo logoClass="w-20"/>
        </h1>

        <div class="flex flex-col">
        <span class="capitalize text-xs sm:text-sm font-[500]">admin m&z marketing agency</span>
        <small class="text-[10px] sm:text-xs text-blue-400">active 1 min ago.</small>
        </div>
</div>

  </header>
  `
})
export class ChatHeaderComponent {

}
