import { Component, input, OnInit, signal } from '@angular/core';
import { HeaderDetailsSideComponent } from "./components/header/header-details-side.component";
import { RelatedComponent } from "./components/related/related.component";
import { CategoriesService } from '../../../../service/categories.service';
import { CategoriesType } from '../../../../../shared/interfaces/categories';


@Component({
  selector: 'app-details-aside',
  imports: [HeaderDetailsSideComponent, RelatedComponent],
  templateUrl: './details-aside.component.html',
  styleUrl: './details-aside.component.css'
})
export class DetailsAsideComponent implements OnInit{

  category = input.required<{id : number , category : string}>()
  categoryData = signal<CategoriesType[]>([])
  constructor(
  private categoriesService : CategoriesService
  ){

  }
  ngOnInit(): void {
  this.getCategory()
  }

  private getCategory() : void {
    console.log(this.category().category);
    
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

}
