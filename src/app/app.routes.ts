import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/page/home.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PackagesComponent } from './features/packages/page/packages/packages.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
    {path : 'home' , component : HomeComponent , },
    {path : 'packages' , component : PackagesComponent , 
    data : {changeBg : true}},
    {path : 'categories' , component : CategoriesComponent , data : {hidelayout : false},
    loadChildren : () => import('./categories/categories.routes').then((r) => r.categoriesRoutes)
    },
    {path : 'register', component : RegisterComponent , outlet : "register"},
    {path : 'loginIn' , component : LoginComponent    , outlet : "loginIn"},
    {path : 'profile' , component : ProfileComponent  , outlet : "profile"},
    {path : '' , redirectTo : 'categories' , pathMatch : 'full'}
];
