import { Component, inject, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-form-feild',
  imports: [SharedModule],
  templateUrl: './form-feild.component.html',
  styleUrl: './form-feild.component.css'
})
export class FormFeildComponent {
  languageServices = inject(LanguageService)
  form = input.required<FormGroup>()
  isShowPass = signal<boolean>(false) ;

}
