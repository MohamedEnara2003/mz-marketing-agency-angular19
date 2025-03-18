import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-form-booking-feild',
  imports: [SharedModule],
  templateUrl: './form-booking-feild.component.html',
  styleUrl: './form-booking-feild.component.css'
})
export class FormBookingFeildComponent {
  formGroup = input.required<FormGroup>()
}
