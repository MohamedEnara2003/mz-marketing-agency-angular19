import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { timer } from 'rxjs';
import { LocaleStorgeService } from '../../../../core/services/locale-storge.service';

@Component({
  selector: 'app-intro-pop-up',
  imports: [SharedModule],
  templateUrl: './intro-pop-up.component.html',
  styleUrl: './intro-pop-up.component.css'
})
export class IntroPopUpComponent implements OnInit{
  private PopUpKay = signal<string>("isIntroPopUp").asReadonly() ;
  private localeStorgeService  = inject(LocaleStorgeService)
  isIntro = signal<boolean>(false) ;
  isIntroPopUp = computed<string | null>(() => this.localeStorgeService.getItem(this.PopUpKay()) )
  
  constructor(){
    effect(() => {
    this.isIntro.set(this.isIntroPopUp() === "true" ? true : false)
    })
  }
  
  ngOnInit(): void {
    if(this.isIntroPopUp() === null){
    timer(700).subscribe(() => this.isIntro.set(!this.isIntro()))
    }
  }
  
  initShowIntroPopUp() : void {
  this.localeStorgeService.setItem(this.PopUpKay() , String(!this.isIntro()))
  this.isIntro.set(!this.isIntro())
  }
}
