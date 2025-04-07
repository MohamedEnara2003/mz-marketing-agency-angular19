import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
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
  styleUrl: './app.component.css',
 
})

export class AppComponent {
  constructor(
  private languageServices : LanguageService ,
  private authService : AuthenticationService,
  ){
  this.languageServices.initSetDefaultLanguage();
  }

 
  

}
