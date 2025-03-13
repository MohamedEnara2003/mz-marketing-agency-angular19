import { Component, inject, input } from '@angular/core';
import { AuthenticationService } from '../../../features/auth/service/authentication.service';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-user-image',
  imports: [SharedModule],
  template : `
 
    <div class=" bg-mz-primary rounded-full  text-center hover:bg-mz-secound 
    duration-200 flex justify-center items-center"
    [ngClass]="imageClass()">
    @if(authService.CurrentUser()){
    @if(authService.CurrentUser()?.picture){
    <img [src]="userImage() || authService.CurrentUser()?.picture" alt="user" 
    class="w-full h-full rounded-full hover:opacity-70 duration-200">
    }@else {
    <a class=" text-white font-bold capitalize text-lg  ">
    {{userName()?.slice(0,1) || authService.CurrentUser()?.userName?.slice(0,1)}}
    </a>
    }

    }@else {
    <i class="fa-solid fa-user text-xl"></i>
    }
    
    </div>
  
  `
})
export class UserImageComponent {
  authService = inject(AuthenticationService)
  imageClass = input<string>();
  userImage = input<string>();
  userName = input<string>();
}
