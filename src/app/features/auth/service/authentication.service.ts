import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { authClient } from '../../../../environments/environment';
import { UserData } from '../../../core/models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  CurrentUser = signal<UserData | null >(null)
  signInWithGoogle() : Observable<any> {
  const promise = authClient.signInWithOAuth({
  provider : "google" ,
  options : {
  redirectTo : window.location.origin === "http://localhost:4200/"  ? window.location.origin : "https://mz-marketing-agency-ng.vercel.app/"
  }
  })
  return from(promise)
  }

  register(userName : string, email : string , password : string) : Observable<any> {
  const promise = authClient.signUp({email , password , options : {
  data : {userName} 
  }})
  return from(promise)
  }

  login(email : string , password : string) : Observable<any> {
  const promise = authClient.signInWithPassword({email , password})
  return from(promise)
  }
  
  signOut() : void {
  authClient.signOut() ;
  }

}
