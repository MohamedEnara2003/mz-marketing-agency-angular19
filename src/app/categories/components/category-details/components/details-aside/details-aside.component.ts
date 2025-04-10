import { Component,  signal } from '@angular/core';
import { RelatedComponent } from "./components/related/related.component";
import { CategoriesType } from '../../../../../shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesState } from '../../../../reducers/reducers.action';
import { select, Store } from '@ngrx/store';
import { selectAllCategories } from '../../../../reducers/category.selector';
import { CategoryHeaderComponent } from "../../../category-header/category-header.component";
import { map } from 'rxjs';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-details-aside',
  imports: [RelatedComponent, CategoryHeaderComponent , LoadingComponent],
  template : `
<aside class="w-full flex flex-col  gap-1">
  <app-category-header class="w-full"
  [queryCategory]="queryParams()?.category"
  />
  <app-related class="w-full" [categoryRelated]="categoryData()"/>
  <app-loading  [isLoading]="isLoading()"/>
</aside>
  `
})
export class DetailsAsideComponent{
    
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>('');
  
  queryParams = signal<{id : number , category : string} | null>(null);
  categoryData = signal<CategoriesType[]>([]);
  categoriesValues = signal<string[]>([]);

  constructor(
  private store : Store<CategoriesState>
  ){
  this.getCategoryFromStore() ;
  }
  
  private getCategoryFromStore() : void {
  this.store.pipe(select(selectAllCategories)) 
  .pipe(
  map((data) => {
  this.isLoading.set(data.isLoading);
  this.errorMsg.set(data.error) ;
  return data.categories
  }),
  takeUntilDestroyed()
  )
  .subscribe({
    next : (category ) => {
    this.categoryData.set(category) ;
    }
  })
  }
  

}
