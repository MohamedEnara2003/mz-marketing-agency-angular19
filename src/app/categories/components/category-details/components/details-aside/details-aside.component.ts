import { Component,  signal } from '@angular/core';
import { RelatedComponent } from "./components/related/related.component";
import { CategoriesService } from '../../../../service/categories.service';
import { CategoriesType } from '../../../../../shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CategoriesState } from '../../../../reducers/reducers.action';
import { select, Store } from '@ngrx/store';
import { selectAllCategories } from '../../../../reducers/category.selector';
import { CategoryHeaderComponent } from "../../../category-header/category-header.component";



@Component({
  selector: 'app-details-aside',
  imports: [RelatedComponent, CategoryHeaderComponent],
  templateUrl: './details-aside.component.html',
  styleUrl: './details-aside.component.css'
})
export class DetailsAsideComponent{
  queryParams = signal<{id : number , category : string} | null>(null)
  categoryData = signal<CategoriesType[]>([])
  categoriesValues = signal<string[]>([]);
  constructor(
  private categoriesService : CategoriesService ,
  private store : Store<CategoriesState>
  ){
  this.getCategoriesValues();
  this.getCategoryFromStore() ;
  }
  
  private getCategoryFromStore() : void {
  this.store.pipe(select(selectAllCategories))
  .pipe(takeUntilDestroyed())
  .subscribe({
    next : (value) => {
    this.categoryData.set(value)
    }
  })
  }
  
  private getCategoriesValues () : void {
  this.categoriesService.getCategoriesValue()
  .pipe(takeUntilDestroyed())
  .subscribe((values) => {
    this.categoriesValues.set(values);
  })
  }

}
