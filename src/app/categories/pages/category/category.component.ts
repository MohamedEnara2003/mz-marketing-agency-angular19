import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { CategoryViewComponent } from "../../components/category-view/category-view.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CategoryHeaderComponent } from "../../components/category-header/category-header.component";
@Component({
  selector: 'app-category',
  imports: [SharedModule, CategoryViewComponent, LoadingComponent, CategoryHeaderComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoryData = signal<CategoriesType[] >([])
  queryCategory = signal<string>("") ;
  categoriesValues = signal<string[]>([]);
  constructor(
  private activatedRoute : ActivatedRoute,
  private categoriesService : CategoriesService
  ){
  this.initSubscription () ;
  this.getCategoriesValues ();
  }

  private initSubscription () : void {
  combineLatest([this.activatedRoute.paramMap , this.activatedRoute.queryParamMap]).pipe(
  switchMap(([paramMap , queryParamMap]) => {
  const category = paramMap.get('category')! ;
  this.queryCategory.set(category);
  const id = +queryParamMap.get('id')!;
  return this.categoriesService.getCategories(category) ;
  }),
  takeUntilDestroyed()
  ).subscribe({
  next : (value) => {
  this.categoryData.set(value);
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

