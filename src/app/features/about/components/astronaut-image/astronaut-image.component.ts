import { Component,ElementRef,signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";


@Component({
  selector: 'app-astronaut-image',
  imports: [SharedModule, LoadingComponent],
  template :`
<div class="relative w-full h-100  flex justify-center items-center after:absolute after:w-[70%] after:opacity-70
after:h-[80%] after:bg-mz-secound after:rounded-[25%] after:rounded-br-[50%] after:rounded-tl-[50%]
after:shadow-2xl after:shadow-black after:border-1 after:border-mz-primary">

@defer (on viewport) {
    <img #astronautRef *ngIf="astronautImage()" 
    class=" astronaut w-60 animate-updown drop-shadow-lg z-1 hover:opacity-90 duration-150 absolute astronaut "
    [src]="astronautImage()" alt="astronaut" loading="lazy">
}@placeholder {
    <app-loading  loadingClass="h-100"/>
}

</div>

  `
})
export class AstronautImageComponent {
  astronautImage = signal<string>("https://res.cloudinary.com/mohamedenara/image/upload/v1742426066/snapedit_1715572680870_mcndjp.png").asReadonly();
}
