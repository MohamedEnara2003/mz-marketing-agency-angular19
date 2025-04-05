import { Injectable } from '@angular/core';
import { NavLinks } from '../../shared/interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  readonly navLinks : NavLinks[] = [
    {
    id : 1 ,
    linkName : 'link.home',
    path : '/home',
    iconName :'fa-solid fa-home',
    },
    {
    id : 2 ,
    linkName : 'link.packages',
    path : '/packages',
    iconName :'fa-solid fa-cubes',
    },
    {
    id : 3 ,
    linkName : 'link.categories',
    path : '/categories',
    iconName :'fa-solid fa-table-cells-large',
    },
    {
    id : 4 ,
    linkName : 'link.aboutUs',
    path : '/about',
    iconName :'fa-solid fa-circle-info',
    },
    {
    id : 5 ,
    linkName : 'link.contactUs',
    path : '/contact',
    iconName :'fa-solid fa-square-phone',
    },
    ]

  readonly dashboardLinks : NavLinks[] = [
    {
    id : 1 ,
    linkName : 'link.categories',
    path : '/dashboard/categories',
    iconName :'fa-solid fa-table-cells-large',
    },
    {
    id : 2 ,
    linkName : 'link.packages',
    path : '/dashboard/packages',
    iconName :'fa-solid fa-cubes',
    },
    {
    id : 3 ,
    linkName : 'profile.booking',
    path : '/dashboard/booking',
    iconName :'fa-solid fa-book-open',
    },
    {
    id : 4 ,
    linkName : 'link.usersChat',
    path : '/dashboard/chat',
    iconName :'fa-regular fa-comment-dots',
    },
    {
    id : 5 ,
    linkName : 'link.home',
    path : '/home',
    iconName :'fa-solid fa-home',
    },
    
    ]

}
