import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const Imports = [
  CommonModule ,
  RouterLink ,
  RouterModule,
  TranslateModule,
  ReactiveFormsModule,
  FormsModule,
]
const Declarations : any[] = [
  
]

@NgModule({
  declarations: [...Declarations],
  imports: [...Imports],
  exports : [...Imports]
})
export class SharedModule { }
