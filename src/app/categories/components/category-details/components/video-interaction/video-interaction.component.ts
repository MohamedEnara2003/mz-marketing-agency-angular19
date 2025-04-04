import { Component, input} from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { ThumbsComponent } from "../thumbs/thumbs.component";



@Component({
  selector: 'app-video-interaction',
  imports: [SharedModule, ThumbsComponent],
  template : `
  <section class="w-full flex flex-col justify-center items-start gap-5  sm:gap-4 text-gray-50 capitalize ">
<nav class="w-full flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-2">
<div class="animate-up font-semibold">
{{title()}}
</div>

<ul class="flex justify-center items-center text-gray-100 gap-5 capitalize font-[500]" >
<app-thumbs  class="flex justify-center items-center gap-5"/>
<li title="share" class="">
<a class="cursor-pointer ">
<i class="fa-regular fa-bookmark"></i> 
{{'categories.save' | translate}}
</a>
</li>
</ul>
</nav>

<ul class="text-xs  font-[500] flex justify-center items-center gap-5">
<li >{{created_at() | date : 'short'}}</li>
</ul>
</section>
  `
})
export class VideoInteractionComponent {
  title = input.required<string>() ;
  created_at= input.required<string>() ;
}
