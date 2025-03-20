import { Component, input } from '@angular/core';

@Component({
  selector: 'app-our-services',
  imports: [],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  serviceTitle = input.required<string>();
  serviceParagraph = input.required<string>();
  listOurService = input.required<string[]>();
}
