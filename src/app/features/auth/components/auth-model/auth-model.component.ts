import { Component,  inject,  input, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SignWithGoogleComponent } from "../sign-with-google/sign-with-google.component";
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-model',
  imports: [SharedModule, SignWithGoogleComponent],
  templateUrl: './auth-model.component.html',
  styleUrl: './auth-model.component.css'
})
export class AuthModelComponent {
  authTilte = input.required<string>() ;
  
  constructor(
  private authService : AuthenticationService ,
  private router : Router
  ){}

  signInWithGoogle() : void {
  this.authService.signInWithGoogle().subscribe() ;
  }
  
  closeAuth() : void {
  this.router.navigate([{outlets : {loginIn: null , register : null}}])
  }
}
