import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthenticationService } from '../auth/service/authentication.service';
import { UserImageComponent } from "../../shared/components/user-image/user-image.component";

@Component({
  selector: 'app-profile',
  imports: [SharedModule, UserImageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  authService = inject(AuthenticationService) ;
  profileLinks = signal([])
}
