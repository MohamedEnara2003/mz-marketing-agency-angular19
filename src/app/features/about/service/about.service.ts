import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { OurServiceData } from '../interface/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  ourServicseData = signal<OurServiceData[]>([
  {
  id : 1 , 
  title : "🎬 Reels & Motion Graphics",
  paragraph : "We bring your brand to life with stunning, high-quality video content. Our team creates:",
  list : [
  "Engaging Reels that capture attention and boost social media presence.",
  "Dynamic Motion Graphics that enhance storytelling and visual appeal.",
  "Professional Video Editing that ensures smooth, high-impact visuals.",
  ]
  },
  {
  id : 2 , 
  title : "🎨 UX/UI Design",
  paragraph : "A seamless user experience is key to customer satisfaction. We provide:",
  list : [
  "Intuitive User Interface (UI) Design that enhances usability and aesthetics.",
  "In-depth User Experience (UX) Research to create customer-focused designs.",
  "Interactive Prototyping and Wireframing for a smooth development process.",
  ]
  },
  {
  id : 3 , 
  title : "🖌 Branding & Graphic Design",
  paragraph : "We build strong, recognizable brands through:",
  list : [
  "Unique Brand Identity Design that reflects your vision.",
  "Creative Logo & Visual Design for a lasting impression.",
  "Marketing materials, Social Media Graphics, and Print Designs that stand out.",
  ]
  },
  {
  id : 4 , 
  title : "💻 Web & Mobile Applications",
  paragraph : "We develop robust, scalable, and user-friendly digital solutions, including:",
  list : [
  "Custom Website Development with modern UI/UX and optimized performance.",
  "Responsive E-Commerce Platforms that enhance online sales.",
  "Feature-rich Mobile Applications for iOS & Android.",
  ]
  },
  ])
}
