import { Injectable } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class GsapService {
  gsap = gsap ;

  animateElement(element: HTMLElement | string) {

    
    gsap.fromTo(
      element,
      {x : -300 , opacity: 0 }, 
      {x : 0 , opacity: 1, duration: 5, ease: "power2.out" ,}
    );
  
  }
}
