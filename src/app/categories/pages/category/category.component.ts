import { Component , OnInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { CategoryViewComponent } from "../../components/category-view/category-view.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CategoryHeaderComponent } from "../../components/category-header/category-header.component";
import { RelatedVideoDetailsComponent } from "../../components/related-video-details/related-video-details.component";
import { select, Store } from '@ngrx/store';
import { CategoriesState } from '../../reducers/reducers.action';
import { selectAllCategories, selectCategory } from '../../reducers/category.selector';

@Component({
  selector: 'app-category',
  imports: [
    SharedModule,
    CategoryViewComponent,
    LoadingComponent, 
    CategoryHeaderComponent, 
    RelatedVideoDetailsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>('');
  categoryData = signal<CategoriesType[] >([]);
  categoriesValues = signal<string[]>([]);
  
  constructor(
  private router : Router ,
  private store : Store<CategoriesState>,
  ){
    this.getCategoryFromStore();
  }

  ngOnInit(): void {
  this.defaultQueryCategory();
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
  

  private defaultQueryCategory() : void {
  this.router.navigate(['/categories'],
  {queryParams : {category : 'motion' } , queryParamsHandling : 'merge'})
  }

  }
  
  


