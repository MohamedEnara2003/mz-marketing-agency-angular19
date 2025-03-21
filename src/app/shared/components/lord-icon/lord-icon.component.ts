import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web/build/player/lottie';
@Component({
  selector: 'app-lord-icon',
  imports: [],
  template: `
  <lord-icon
  [attr.src]="options().src"
  [attr.trigger]="options().trigger"
  [colors]="options().colors"
  [attr.state]="options().state"
  [class]="options().class"
  >
  </lord-icon>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LordIconComponent {
  options = input.required<{
  src : string,
  trigger : string,
  class ? : string ,
  colors? : string,
  state? : string
  }>()

  constructor(){
  defineElement(lottie.loadAnimation);
  }
}
