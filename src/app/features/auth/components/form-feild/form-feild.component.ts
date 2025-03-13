import { Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-form-feild',
  imports: [SharedModule],
  templateUrl: './form-feild.component.html',
  styleUrl: './form-feild.component.css'
})
export class FormFeildComponent {
  form = input.required<FormGroup>()
  isShowPass = signal<boolean>(false) ;

  initShowPassword () : void {
  this.isShowPass.set(!this.isShowPass());
  }
}
