import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { authClient } from '../../../../environments/environment';
import { UserData } from '../../../core/models/user.model';
import { User } from '@supabase/gotrue-js';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  CurrentUser = signal<UserData | null >(null);

  readonly Admin_id : string = "6a5c0595-c564-4050-98d9-a78316b62f5b";

  constructor(){
    this.initAuthentication();
  }
  signInWithGoogle() : Observable<any> {
  const promise = authClient.signInWithOAuth({
  provider : "google" ,
  options : {
  redirectTo : window.location.pathname
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
  

  initAuthentication() : void {
    authClient.onAuthStateChange((event , session) => {
    if(event === 'SIGNED_IN'){
    const identity_data = session?.user.identities?.at(0)?.identity_data;
    
    this.CurrentUser.set({
      user_id : session?.user.identities?.at(0)?.user_id! ,
      email : session?.user.email! ,
      userName : identity_data?.['name'] || identity_data?.['full_name'] ,
      picture : identity_data?.['picture'] || identity_data?.['avatar_url'] ,
    })

    }else if (event === 'SIGNED_OUT'){
    this.CurrentUser.set(null);
    }
    })
 
    
  }


}
