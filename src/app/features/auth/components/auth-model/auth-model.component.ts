import { Component,  effect,   input, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SignWithGoogleComponent } from "../sign-with-google/sign-with-google.component";
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { LordIconComponent } from "../../../../shared/components/lord-icon/lord-icon.component";
import { timer } from 'rxjs';


@Component({
  selector: 'app-auth-model',
  imports: [SharedModule, SignWithGoogleComponent, LordIconComponent],
  templateUrl: './auth-model.component.html',
  styleUrl: './auth-model.component.css'
})
export class AuthModelComponent {
  authTilte = input.required<string>() ;
  triggerUserIcon = signal<string>("loop") ;

  constructor(
  private authService : AuthenticationService ,
  private router : Router
  ){
  effect(() => {
  timer(3000).subscribe(() =>  this.triggerUserIcon.set('hover'))
  })
  }

  signInWithGoogle() : void {
  this.authService.signInWithGoogle().subscribe() ;
  }
  
  closeAuth() : void {
  this.router.navigate([{outlets : {loginIn: null , register : null}}])
  }
}
