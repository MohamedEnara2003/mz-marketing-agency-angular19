import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { AuthenticationService } from '../../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFeildComponent } from "../../components/form-feild/form-feild.component";
import { AuthModelComponent } from "../../components/auth-model/auth-model.component";

@Component({
  selector: 'app-register',
  imports: [SharedModule, FormFeildComponent, AuthModelComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form : FormGroup ;

  constructor(
  private authService : AuthenticationService ,
  private fb : FormBuilder
  ){}

  ngOnInit(): void {
  this.initLoginIn()
  }
  
  private initLoginIn() : void {
  this.form = this.fb.group({
  userName : [null ,  [Validators.required , Validators.maxLength(50)]] ,
  email : [null ,  [Validators.email , Validators.required]] ,
  password : [null ,  [Validators.required ,Validators.minLength(6), Validators.maxLength(40)]],
  })
  }

  signInWithGoogle() : void {
  this.authService.signInWithGoogle() ;
  }

  register(form : FormGroup) : void {
  const vlaue = form.getRawValue() ;
  if(form.valid){
  this.authService.register(vlaue.userName ,vlaue.email , vlaue.password).subscribe()
  }
  }
}
