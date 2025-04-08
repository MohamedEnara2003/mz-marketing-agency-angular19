import { Component, input} from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { ThumbsComponent } from "../thumbs/thumbs.component";

@Component({
  selector: 'app-video-interaction',
  imports: [SharedModule, ThumbsComponent],
  template : `
  <section class="w-full flex flex-col justify-center items-start gap-5  sm:gap-4 text-gray-50 capitalize ">

<nav class="w-full flex  flex-wrap justify-between items-start gap-4 sm:gap-2">
<div class="animate-up font-semibold">
{{title()}}
</div>

<ul class="w-[99%] md:w-auto flex justify-end items-center text-gray-100 gap-5 capitalize font-[500] 
text-xs" >
<li >{{created_at() | date : 'short'}}</li>
<app-thumbs  class="flex justify-center items-center gap-5"/>
</ul>
</nav>

</section>
  `
})
export class VideoInteractionComponent {
  title = input.required<string>() ;
  created_at= input.required<string>() ;
}
