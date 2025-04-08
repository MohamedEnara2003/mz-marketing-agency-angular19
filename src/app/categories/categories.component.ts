import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoriesService } from './service/categories.service';
import { noop,  of,  switchMap, tap } from 'rxjs'
import { CategoriesState } from './reducers/reducers.action';
import { categoriesActions } from './reducers/action-types';



@Component({
  selector: 'app-categories',
  imports: [RouterOutlet],
  template : `
  <section class="w-full">
  <router-outlet />
  </section>
  `,

})
export class CategoriesComponent {

  constructor(
  private activatedRoute : ActivatedRoute,
  private categoriesService : CategoriesService,
  private store: Store<CategoriesState>
  ) {
  this.initSubscription() ;
  }

  private initSubscription () : void {
    this.activatedRoute.queryParamMap.pipe(
    switchMap(( queryParamMap) => {
    const category = queryParamMap.get('category')! ;
    if (!category) return of([]);
    
    return  this.categoriesService.getCategories(category) 
    .pipe(
    tap((category) => {
    this.store.dispatch(
    categoriesActions.GetCategories({categories : category})
    )
    })
    );
    }),
    takeUntilDestroyed()
    ).subscribe({
      next : noop,
      error: (err) => console.error('Error loading categories:', err),
    }
    )
  }
}
