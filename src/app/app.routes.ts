import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/page/home.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { BookingComponent } from './features/booking/booking.component';


export const routes: Routes = [
    {path : 'home' , component : HomeComponent , },
    {path : 'packages' , data : {headerHide : true},
    loadComponent : () => import('./features/packages/page/packages/packages.component')
    .then((c => c.PackagesComponent))
    },  
    {path : 'categories' , data : {headerHide : true} ,
    loadChildren : () => import('./categories/categories.routes').then((r) => r.categoriesRoutes),
    loadComponent : () => import('./categories/categories.component').then((c => c.CategoriesComponent))
    },
    
    {path : 'dashboard' , data : {headerHide : true} ,
    loadChildren : () => import('./dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
    loadComponent : () => import('./dashboard/dashboard.component').then((c => c.DashboardComponent))
    },
    
    {path : 'orders' ,  data : {headerHide : true} , 
    loadComponent : () => import('./features/orders/page/orders.component').then((c => c.OrdersComponent))
    },
    {path : 'about' ,  data : {headerHide : true} , 
    loadComponent : () => import('./features/about/page/about.component').then((c => c.AboutComponent))
    },
    {path : 'contact', data : {headerHide : true} , 
    loadComponent : () => import('./features/contact/page/contact.component').then((c => c.ContactComponent))
    },
    {path : 'chat', data : {headerHide : true} , 
    loadComponent : () => import('./chat/page/chat.component').then((c => c.ChatComponent))
    },
    {path : 'history', data : {headerHide : true} , 
    loadComponent : () => import('./features/history/page/history.component').then((c => c.HistoryComponent))
    },
    {path : 'register', component : RegisterComponent,outlet : "register"},
    {path : 'loginIn' , component : LoginComponent   ,outlet : "loginIn" },
    {path : 'profile' , component : ProfileComponent ,outlet : "profile" },
    {path : 'booking' , component : BookingComponent ,outlet : "booking-outlet" },
    
    {path : '' , redirectTo : 'home' , pathMatch : 'full'},
    {path : '**' , redirectTo : 'home' , pathMatch : 'full'}
];
