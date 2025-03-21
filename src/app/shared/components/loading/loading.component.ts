import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-loading',
  imports: [SharedModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  loadingClass = input<string>()
}
