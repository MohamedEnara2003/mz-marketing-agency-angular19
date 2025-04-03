import { Routes } from "@angular/router";



export const dashboardRoutes: Routes = [
    {path : 'chat', loadComponent: () => import('./pages/chat/page/admin-chat.component')
    .then(c => c.AdminChatComponent)
    },
    {path : 'chat/:chatId', loadComponent: () => import('./pages/chat/page/admin-chat.component')
    .then(c => c.AdminChatComponent)
    },
] ;