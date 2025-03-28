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
  private activatedRoute : ActivatedRoute,
  private router : Router ,
  private categoriesService : CategoriesService,
  private localeStorgeService : LocaleStorgeService,
  ){


  this.initSubscription () ;
  this.getCategoriesValues ();
  }

  ngOnInit(): void {
  this.defaultQueryCategory();
  } 


  private initSubscription () : void {
  this.activatedRoute.queryParamMap.pipe(
  switchMap(( queryParamMap) => {
  const category = queryParamMap.get('category')! ;
  const id = +queryParamMap.get('id')!
  this.queryCategory.set(category);
  return combineLatest([
  this.categoriesService.getCategories(category) ,
  id ? this.categoriesService.getCategoryById(id) : of(null)
  ]) ;
  }),
  takeUntilDestroyed()
  ).subscribe({
  next : ([category , categoryById ]) => {
  this.categoryData.set(category);
  this.categoryById.set(categoryById)
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
  
  private defaultQueryCategory() : void {
  const id = this.localeStorgeService.getItem('VideoDetailsKay');
  this.router.navigate(['/categories'],{queryParams : {category : 'motion' , id : id} 
  , queryParamsHandling : 'merge'})
  }

  }
  
  


