import { Component, effect, ElementRef, input, signal, viewChildren } from '@angular/core';
import { CategoriesType } from '../../../../../../../shared/interfaces/categories';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { CategoryViewComponent } from "../../../../../category-view/category-view.component";
import { DayJsService } from '../../../../../../service/day-js.service';

@Component({
  selector: 'app-related',
  imports: [SharedModule, CategoryViewComponent],
  templateUrl: './related.component.html',
  styleUrl: './related.component.css'
})
export class RelatedComponent {
  
  categoryRelated = input.required<CategoriesType[]>()
  categoryRelatedData = input.required<{id : number , category : string}>()

  videosDurations = signal<number[]>([]) ;
  categoryViewComponent = viewChildren<CategoryViewComponent>(CategoryViewComponent) ;

  constructor(private dayJsService : DayJsService){
  effect(() => {
  this.initVideosRef();
  })
  }
  
  formatTime(timestamp: string): string {
    return this.dayJsService.formatTime(timestamp)
  }
  private initVideosRef () : void {
  const durations : number[] = [] ; 

  this.categoryViewComponent().map((categoryView , index) => {
  durations[index] = categoryView.duration() ;
  this.videosDurations.set([...durations])
  })
  }


}
