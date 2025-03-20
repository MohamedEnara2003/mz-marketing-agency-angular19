import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/page/home.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PackagesComponent } from './features/packages/page/packages/packages.component';
import { CategoriesComponent } from './categories/categories.component';
import { AboutComponent } from './features/about/page/about.component';
import { ContactComponent } from './features/contact/page/contact.component';
import { BookingComponent } from './features/booking/booking.component';


export const routes: Routes = [
    {path : 'home' , component : HomeComponent , },
    {path : 'packages' , component : PackagesComponent , data : {headerHide : true} ,},
    {path : 'categories' , component : CategoriesComponent , data : {headerHide : true} ,
    loadChildren : () => import('./categories/categories.routes').then((r) => r.categoriesRoutes)
    },
    {path : 'about', component : AboutComponent ,  data : {headerHide : true}  },
    {path : 'contact', component : ContactComponent ,},
    {path : 'register', component : RegisterComponent , outlet : "register"},
    {path : 'loginIn' , component : LoginComponent    , outlet : "loginIn" },
    {path : 'profile' , component : ProfileComponent  , outlet : "profile" },
    {path : 'booking' , component : BookingComponent , outlet : "booking-outlet" },
    {path : '' , redirectTo : 'home' , pathMatch : 'full'},
    {path : '**' , redirectTo : 'home' , pathMatch : 'full'}
];
