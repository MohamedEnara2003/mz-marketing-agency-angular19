import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-astronaut-image',
  imports: [SharedModule],
  templateUrl: './astronaut-image.component.html',
  styleUrl: './astronaut-image.component.css'
})
export class AstronautImageComponent {
  astronautImage = signal<string>("https://res.cloudinary.com/mohamedenara/image/upload/v1742426066/snapedit_1715572680870_mcndjp.png").asReadonly()
}
