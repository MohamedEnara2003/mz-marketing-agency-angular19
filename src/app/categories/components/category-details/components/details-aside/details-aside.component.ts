import { Component,  signal } from '@angular/core';
import { RelatedComponent } from "./components/related/related.component";
import { CategoriesType } from '../../../../../shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesState } from '../../../../reducers/reducers.action';
import { select, Store } from '@ngrx/store';
import { selectAllCategories } from '../../../../reducers/category.selector';
import { CategoryHeaderComponent } from "../../../category-header/category-header.component";

@Component({
  selector: 'app-details-aside',
  imports: [RelatedComponent, CategoryHeaderComponent],
  template : `
<aside class="w-full flex flex-col  gap-1">
  <app-category-header class="w-full"
  [queryCategory]="queryParams()?.category"
  />
  <app-related class="w-full"
  [categoryRelated]="categoryData()"/>
</aside>
  `
})
export class DetailsAsideComponent{
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
  .pipe(takeUntilDestroyed())
  .subscribe({
    next : (value) => {
    this.categoryData.set(value) ;
    }
  })
  }
  

}
