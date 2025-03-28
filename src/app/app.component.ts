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
  
  initAuthentication() : void {
  authClient.onAuthStateChange((event , session) => {
  if(event === 'SIGNED_IN'){
  this.authService.CurrentUser.set({
    user_id : session?.user.identities?.at(0)?.user_id! ,
    email : session?.user.email! ,
    userName : session?.user.identities?.at(0)?.identity_data?.['name'],
    picture : session?.user.identities?.at(0)?.identity_data?.['picture'],
  })
  
  }else if (event === 'SIGNED_OUT'){
  this.authService.CurrentUser.set(null);
  }
  })
  }
}
