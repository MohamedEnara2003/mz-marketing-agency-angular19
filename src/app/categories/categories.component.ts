import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, noop, of, switchMap, tap} from 'rxjs'
import { CategoriesState } from './reducers/reducers.action';
import { categoriesActions } from './reducers/action-types';
import { CategoriesService } from './service/categories.service';



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
  private store: Store<CategoriesState> ,
  private activatedRoute : ActivatedRoute ,
  private categoriesService : CategoriesService,
  
  ) {
  this.initSubscription() ;
  
  }

  private initSubscription () : void {
    this.activatedRoute.queryParamMap.pipe(
    switchMap((queryParamMap ) => {
    const category = queryParamMap.get('category')! ;
    return  this.categoriesService.getCategories(category).pipe(
      tap(() => this.store.dispatch(categoriesActions.GetCategories())),
      map((categories) => this.store.dispatch(categoriesActions.GetCategoriesSuccess({categories}))),
      catchError((error) => of(categoriesActions.GetCategoriesFailure
      ({error : "Oops! We couldn't load the category. Please try again later."}))
      ),
      )
    }), takeUntilDestroyed()
  ).subscribe()
  }


}
