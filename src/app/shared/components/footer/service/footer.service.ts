import { Injectable, signal } from '@angular/core';
import { FooterLinks, SocialMedia } from '../../../../core/models/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  footerLinks = signal<FooterLinks[]>([
    {
      id : 1 , title : 'about' ,  
      links : [
      'companyHistory',
      'meetTheTeam',
      'employeeHandbook',
      'packages',
    ]},
    {
      id : 2 , title : 'ourServices' ,  
      links : [
      'reelsVideos',
      'motionGraphics',
      'designs',
      'uxUi',
      'webApplication',
      'mobileApplication',
      'wordpress'
    ]},
      {
      id : 3 , title : 'toolsUsed' ,  
      links : [
      'adobePremiere',
      'photoshop',
      'angular',
      'reactJs',
    ]},
      {
      id : 4 , title : 'helpfulLinks' ,  
      links : ['faqs','support','complaints',]
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
