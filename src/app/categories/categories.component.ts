import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoriesService } from './service/categories.service';
import { combineLatest, noop, of, switchMap, take, tap } from 'rxjs'
import { CategoriesState } from './reducers/reducers.action';
import { categoriesActions } from './reducers/action-types';



@Component({
  selector: 'app-categories',
  imports: [RouterOutlet],
  template : `
  <section class="w-full ">
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
  this.initSubscription()
  }

  private initSubscription () : void {
    this.activatedRoute.queryParamMap.pipe(
    switchMap(( queryParamMap) => {
    const category = queryParamMap.get('category')! ;
    const id = +queryParamMap.get('id')!
    return combineLatest([
    this.categoriesService.getCategories(category) ,
    id ? this.categoriesService.getCategoryById(id) : of(null)
    ])
    .pipe(
    tap(([category , categoryById]) => {
    this.store.dispatch(categoriesActions.GetCategories({categories : category}))
    })
    );
    }),
    takeUntilDestroyed()
    ).subscribe(
    noop ,
    )
  }
    
    
}
