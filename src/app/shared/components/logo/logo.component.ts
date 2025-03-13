import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-logo',
  imports: [SharedModule],
  template : `
  <img routerLink="/" [src]="logoSrc" alt="logo" [ngClass]="logoClass()"
  class="cursor-pointer">
  `,
})
export class LogoComponent {
  readonly logoSrc = "https://kzzljjlggloknteiirlr.supabase.co/storage/v1/object/sign/assets/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbG9nby5wbmciLCJpYXQiOjE3NDExMTA3ODYsImV4cCI6MTc3MjY0Njc4Nn0.7k4LITTbl9t2ZT2MwPtj1fSUmz8a3y8-YqkqHDQmd68" ; 
  logoClass = input<string>() ;
}
