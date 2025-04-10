import { Component, effect, input, signal, viewChildren } from '@angular/core';
import { CategoriesType } from '../../../../../../../shared/interfaces/categories';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { CategoryViewComponent } from "../../../../../category-view/category-view.component";
import { DayJsService } from '../../../../../../service/day-js.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-related',
  imports: [SharedModule, CategoryViewComponent],
  templateUrl: './related.component.html',
  styleUrl: './related.component.css'
})
export class RelatedComponent {
  
  categoryRelated = input.required<CategoriesType[]>()
  relatedId = signal<number>(0) ;
  videosDurations = signal<number[]>([]) ;
  categoryViewComponent = viewChildren<CategoryViewComponent>(CategoryViewComponent) ;

  constructor(
  private dayJsService : DayJsService ,
  private activatedRoute : ActivatedRoute,
  ){
  effect(() => {
  this.initVideosRef();
  })
  this.getRelatedId ();
  }

  private getRelatedId () : void {
    this.activatedRoute.queryParamMap.pipe(
    tap((queryParamMap) => {
      const id = +queryParamMap.get('id')! ;
      this.relatedId.set(id)
    }), takeUntilDestroyed()
    ).subscribe()
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
