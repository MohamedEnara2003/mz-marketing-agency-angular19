import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { timer } from 'rxjs';

@Component({
  selector: 'app-intro-pop-up',
  imports: [SharedModule],
  templateUrl: './intro-pop-up.component.html',
  styleUrl: './intro-pop-up.component.css'
})
export class IntroPopUpComponent implements OnInit{
  
  isIntro = signal<boolean>(false) ;

  ngOnInit(): void {
  timer(700).subscribe(() => this.isIntro.set(!this.isIntro()))
  }
  
  initShowIntroPopUp() : void {
  this.isIntro.set(!this.isIntro())
  }
}
