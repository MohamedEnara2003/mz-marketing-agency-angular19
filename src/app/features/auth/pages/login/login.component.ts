import { Component, OnInit, signal } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFeildComponent } from "../../components/form-feild/form-feild.component";
import { AuthModelComponent } from "../../components/auth-model/auth-model.component";


@Component({
  selector: 'app-login',
  imports: [SharedModule, FormFeildComponent, AuthModelComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form : FormGroup ;
  logInErrorMsg = signal<string>('');
  constructor(
  private authService : AuthenticationService ,
  private fb : FormBuilder
  ){}

  ngOnInit(): void {
  this.initLoginIn()
  }
  
  private initLoginIn() : void {
  this.form = this.fb.group({
  email : [null ,  [Validators.email , Validators.required]] ,
  password : [null ,  [Validators.required ,Validators.minLength(6), Validators.maxLength(40)]],
  })
  }

  login(form : FormGroup) : void {
  const vlaue = form.getRawValue() ;
  if(form.valid){
  this.authService.login(vlaue.email , vlaue.password).subscribe({
    next : ({_ , error}) => {
    if(error){
    this.logInErrorMsg.set("Invalid login credentials")
    }
    }
  });
  }
}
}
