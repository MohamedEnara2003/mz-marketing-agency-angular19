import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { LanguageService } from './core/services/language.service';
import { AuthenticationService } from './features/auth/service/authentication.service';
import { authClient } from '../environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  constructor(
  private languageServices : LanguageService ,
  private authService : AuthenticationService,
  ){
  this.languageServices.initSetDefaultLanguage();
  }

  ngOnInit(): void {
  this.initAuthentication();
  }
  
  private initAuthentication() : void {
  authClient.onAuthStateChange((event , session) => {
  if(event === 'SIGNED_IN'){
  const identity_data = session?.user.identities?.at(0)?.identity_data;

  this.authService.CurrentUser.set({
    user_id : session?.user.identities?.at(0)?.user_id! ,
    email : session?.user.email! ,
    userName : identity_data?.['name'] || identity_data?.['full_name'] ,
    picture : identity_data?.['picture'] || identity_data?.['avatar_url'] ,
  })
  
  }else if (event === 'SIGNED_OUT'){
  this.authService.CurrentUser.set(null);
  }
  })
  }
}
