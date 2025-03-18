import { Component, input, output } from '@angular/core';
import { Selection } from '../../interfaces/shared';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-select',
  imports: [SharedModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  
  getData = input.required<Selection[]>()
  isSelect = input.required<boolean>()
  sindValue = output<string>()

  chooseValue (value : string) : void {
  this.sindValue.emit(value);
  }
}
