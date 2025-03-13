import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { AuthenticationService } from '../../../features/auth/service/authentication.service';
import { Router } from '@angular/router';
import { SelectionTranslateComponent } from "../selection-translate/selection-translate.component";
import { UserImageComponent } from "../user-image/user-image.component";


@Component({
  selector: 'app-user',
  imports: [SharedModule, SelectionTranslateComponent, UserImageComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  authService = inject(AuthenticationService);
  private router = inject(Router);
  showUserData  = signal<boolean>(false)
  initModleUserData () : void {
  this.showUserData.set(!this.showUserData()) ;
  this.router.navigate([{outlets : {profile: this.showUserData() ?  'profile' : null  }}])
  }
}
