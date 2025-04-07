import { Component , OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { CategoryViewComponent } from "../../components/category-view/category-view.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CategoryHeaderComponent } from "../../components/category-header/category-header.component";
import { RelatedVideoDetailsComponent } from "../../components/related-video-details/related-video-details.component";
import { LocaleStorgeService } from '../../../core/services/locale-storge.service';
import { select, Store } from '@ngrx/store';
import { CategoriesState } from '../../reducers/reducers.action';
import { selectAllCategories } from '../../reducers/category.selector';


@Component({
  selector: 'app-category',
  imports: [SharedModule, CategoryViewComponent, LoadingComponent, CategoryHeaderComponent, RelatedVideoDetailsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoryData = signal<CategoriesType[] >([])
  categoryById = signal<CategoriesType | null >(null)
  queryCategory = signal<string>("") ;
  categoriesValues = signal<string[]>([]);


  constructor(
  private router : Router ,
  private categoriesService : CategoriesService,
  private localeStorgeService : LocaleStorgeService,
  private store : Store<CategoriesState>
  ){
  this.getCategoriesValues ();
  this.getCategoryFromStore();
  }

  ngOnInit(): void {
  this.defaultQueryCategory();
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
  
  private defaultQueryCategory() : void {
  const id = this.localeStorgeService.getItem('VideoDetailsKay');
  this.router.navigate(['/categories'],{queryParams : {category : 'motion' , id : id} 
  , queryParamsHandling : 'merge'})
  }

  }
  
  


