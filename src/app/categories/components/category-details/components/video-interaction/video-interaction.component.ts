import { Component, input } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';


@Component({
  selector: 'app-video-interaction',
  imports: [SharedModule],
  templateUrl: './video-interaction.component.html',
  styleUrl: './video-interaction.component.css'
})
export class VideoInteractionComponent {
  
  title = input.required<string>() ;
  views = input.required<number>() ;
  created_at= input.required<string>() ;


}
