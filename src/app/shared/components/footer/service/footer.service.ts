import { Injectable, signal } from '@angular/core';
import { FooterLinks, SocialMedia } from '../../../../core/models/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  footerLinks = signal<FooterLinks[]>([
    {
      id : 1 , title : 'about us' ,  
      links : [
      'Company History',
      'Meet the Team',
      'Employee Handbook',
      'Package',
    ]},
    {
      id : 2 , title : 'our services' ,  
      links : [
      'reels videos',
      'design website',
      'motion graphics',
      'designs',
      'web application',
      'mobile application',
      'word press'
    ]},
      {
      id : 3 , title : 'Tools used' ,  
      links : [
      'Adobe Premiere',
      'photo shop',
      'angular',
      'react js',
    ]},
      {
      id : 4 , title : 'Helpful Links' ,  
      links : ['FAQs','Support','Complaints',]
    }
  ]).asReadonly();

  footerSocialMedia = signal<SocialMedia[]>([
  {id : 1 , name : 'fa-brands fa-linkedin', path : '/'},
  {id : 2 , name : 'fa-brands fa-facebook', path : '/'},
  {id : 3 , name : 'fa-brands fa-github' , path : '/'},
  {id : 4 , name : 'fa-solid fa-envelope' , path : '/'},
  {id : 5 , name : 'fa-brands fa-whatsapp', path : '/'},
  ])
}
