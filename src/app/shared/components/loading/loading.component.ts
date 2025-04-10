import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-loading',
  imports: [SharedModule],
  template : `
  @if(isLoading()){
  <div class="w-full flex justify-center items-center "
  [ngClass]="loadingClass() ? loadingClass() : 'h-[80vh]'">
  <span class="loading loading-spinner  w-24 text-mz-primary"></span>
  </div>
  }
  `

})
export class LoadingComponent {
  loadingClass = input<string>()
  isLoading = input<boolean>(true)
}
