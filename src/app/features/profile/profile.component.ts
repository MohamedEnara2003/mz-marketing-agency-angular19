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

  profileLinks = signal([
  {linkName : 'profile.signOut' , iconName : 'fa-solid fa-sign-out text-xl',  
  path : null},

  {linkName : 'profile.history' , iconName : 'fa-solid fa-clock-rotate-left text-xl',  
  path :['/',{outlets : {primary :['history'], profile : null}}] 
  },

  {linkName : 'chat m&z' , iconName : 'fa-regular fa-comment-dots text-xl',
  path :  ['/',{outlets : {primary : ['chat'] , profile : null}}]},

  {linkName : 'profile.booking' , iconName : 'fa-solid fa-book-open text-xl',
  path : ['/',{outlets : {'booking-outlet': 'booking' , profile : null}}]
  },

  {linkName : 'profile.orders' , iconName : 'fa-solid fa-bag-shopping text-xl mx-0.5',
  path : ['/',{outlets : { primary : ['orders'],  profile : null}}]
  },
  {linkName : 'profile.home' , iconName : 'fa-solid fa-home text-xl',
  path : ['/']
  },
  ])
}



