import { Component, input, OnInit, signal } from '@angular/core';
import { RelatedComponent } from "./components/related/related.component";
import { CategoriesService } from '../../../../service/categories.service';
import { CategoriesType } from '../../../../../shared/interfaces/categories';
import { CategoryHeaderComponent } from "../../../category-header/category-header.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-details-aside',
  imports: [RelatedComponent, CategoryHeaderComponent],
  templateUrl: './details-aside.component.html',
  styleUrl: './details-aside.component.css'
})
export class DetailsAsideComponent implements OnInit{

  category = input.required<{id : number , category : string}>()
  categoryData = signal<CategoriesType[]>([])
  categoriesValues = signal<string[]>([]);
  constructor(
  private categoriesService : CategoriesService
  ){
  this.getCategoriesValues()
  }
  
  ngOnInit(): void {
  this.getCategory()
  }

  private getCategory() : void {
    this.categoriesService.getCategories(this.category().category)
    .subscribe({
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
