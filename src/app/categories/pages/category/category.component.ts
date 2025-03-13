import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { CategoryViewComponent } from "../../components/category-view/category-view.component";


@Component({
  selector: 'app-category',
  imports: [SharedModule, CategoryViewComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  

  categoryData = signal<CategoriesType[] >([])

  constructor(
  private activatedRoute : ActivatedRoute,
  private categoriesService : CategoriesService
  ){
  this.initSubscription () ;
  }

  private initSubscription () : void {
  combineLatest([this.activatedRoute.paramMap , this.activatedRoute.queryParamMap]).pipe(
  switchMap(([paramMap , queryParamMap]) => {
  const category = paramMap.get('category')! ;
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

}

