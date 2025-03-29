import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { AuthenticationService } from '../../../features/auth/service/authentication.service';
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
  showUserData  = signal<boolean>(false)

  initModleUserData () : void {
  this.showUserData.set(!this.showUserData()) ;
  }
}
