import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-logo',
  imports: [SharedModule],
  template : `
  <img [routerLink]="isPath() ? getPath() : null" [src]="logoSrc" alt="logo" [ngClass]="logoClass()"
  class="animate-up">
  `,
})
export class LogoComponent {
  readonly logoSrc : string = "https://kzzljjlggloknteiirlr.supabase.co/storage/v1/object/sign/assets/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbG9nby5wbmciLCJpYXQiOjE3NDIwMDYzMzcsImV4cCI6MTc3MzU0MjMzN30.gx15c9_13ULdJBbqrMLuqFxhJt8y36ZTt20NAfESHRk" ; 
  logoClass = input<string>() ;
  getPath = input<string>('/home');
  isPath = input<boolean>(true) ;
} 
