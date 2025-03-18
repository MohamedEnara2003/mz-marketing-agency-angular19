import { Component, inject, input } from '@angular/core';
import { AuthenticationService } from '../../../features/auth/service/authentication.service';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-user-image',
  imports: [SharedModule],
  template : `
 
    <div class="relative bg-mz-primary rounded-full  text-center hover:bg-mz-secound 
    duration-200 flex justify-center items-center"
    [ngClass]="imageClass()">
    @if(authService.CurrentUser() || userData()){
    @if(authService.CurrentUser()?.picture ||  userData()?.image){
    <img [src]="userData()?.image || authService.CurrentUser()?.picture" alt="user" 
    class="w-full h-full rounded-full hover:opacity-70 duration-200">
    }@else {
    <a class=" text-white font-bold capitalize text-lg  ">
    {{userData()?.userName!.slice(0,1) || authService.CurrentUser()?.userName?.slice(0,1)}}
    </a>
    }
 
    }@else {
    <i class="fa-solid fa-user text-xl"></i>
    }
    <ng-content />
    </div>
  
  `
})
export class UserImageComponent {
  authService = inject(AuthenticationService)
  imageClass = input<string>();
  userData = input<{image : string , userName : string}>();
}
