import { Component,  signal } from '@angular/core';
import { RelatedComponent } from "./components/related/related.component";
import { CategoriesService } from '../../../../service/categories.service';
import { CategoriesType } from '../../../../../shared/interfaces/categories';
import { CategoryHeaderComponent } from "../../../category-header/category-header.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';



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
  private activatedRoute : ActivatedRoute,
  ){
  this.getCategoriesValues();
  this.getCategoryAndInitQuery();
  }
  
  private getCategoryAndInitQuery() : void {
    this.activatedRoute.queryParamMap.pipe(
    switchMap((queryParamMap) => {
    const category = queryParamMap.get('category')!;
    const id = +queryParamMap.get('id')!;
    this.queryParams.set({id : id , category : category});
    return  this.categoriesService.getCategories(category)
    }),
    takeUntilDestroyed()
    ).subscribe({
      next : (value) => {
      this.categoryData.set(value)
      },
      error : (err) => {
      console.log(err);
      },
      complete : () => {}
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
