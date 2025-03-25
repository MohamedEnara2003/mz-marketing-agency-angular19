import { Component, input} from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { ThumbsComponent } from "../thumbs/thumbs.component";



@Component({
  selector: 'app-video-interaction',
  imports: [SharedModule, ThumbsComponent],
  templateUrl: './video-interaction.component.html',
  styleUrl: './video-interaction.component.css'
})
export class VideoInteractionComponent {
  title = input.required<string>() ;
  views = input.required<number>() ;
  created_at= input.required<string>() ;


}
