import { Routes } from "@angular/router";



export const dashboardRoutes: Routes = [
    {path : 'chat', loadComponent: () => import('./pages/chat/page/admin-chat.component')
    .then(c => c.AdminChatComponent)
    },
    {path : 'chat/:chatId', loadComponent: () => import('./pages/chat/page/admin-chat.component')
    .then(c => c.AdminChatComponent)
    },
    {path : 'categories', loadComponent: () => import('./pages/categories/page/categories.component')
    .then(c => c.CategoriesComponent)
    },
    {path : 'packages', loadComponent: () => import('./pages/packages/page/packages.component')
    .then(c => c.PackagesComponent)
    },
    {path : 'booking', loadComponent: () => import('./pages/booking/page/booking.component')
    .then(c => c.BookingComponent)
    },
] ;