import { Component, effect, ElementRef,  OnInit,  signal, viewChildren} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import {  EMPTY,  switchMap } from 'rxjs';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoInteractionComponent } from "./components/video-interaction/video-interaction.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { DetailsAsideComponent } from "./components/details-aside/details-aside.component";
import { CategoryViewComponent } from "../category-view/category-view.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { LocaleStorgeService } from '../../../core/services/locale-storge.service';


@Component({
  selector: 'app-category-details',
  imports: [
    SharedModule, VideoInteractionComponent, CommentsComponent, DetailsAsideComponent,
    CategoryViewComponent,
    LoadingComponent
],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent{

  categoryDataById = signal<CategoriesType | null>(null);
  queryCategory  = signal<string>('');
  queryId = signal<number>(0);
  videoUrl = signal<SafeResourceUrl>('');

  categoryView = viewChildren<ElementRef<CategoryViewComponent>>('categoryView')
  videoViews = signal<number>(0) ;
  constructor(
  private activtedRoute : ActivatedRoute ,
  private router : Router ,
  private categoriesService : CategoriesService,
  private sanitizer : DomSanitizer,
  private localeStorgeService : LocaleStorgeService
  ){
  effect(() => {
  this.continionVideoDetails();
  this.addCategoryInHistory ();
  })
  this.initSubscription();
  }

  
  
  private initSubscription () : void {
  this.activtedRoute.queryParamMap.pipe(
  switchMap((queryParamMap) => {
  const category = queryParamMap.get('category')!;
  const id = +queryParamMap.get('id')!;
  this.queryCategory.set(category);
  if(!id){
  this.router.navigate(['/categories/watch/', category], {queryParams : {id : 2}});
  return EMPTY;
  }else{
    this.queryId.set(id);
    return this.categoriesService.getCategoryById(id);
  }
  }),
  takeUntilDestroyed()
  ).subscribe({
  next : (value) => {
  this.categoryDataById.set(value);
  this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(value.url));
  },
  error : (err) => {
  console.log(err);
  },
  complete : () => {}
  })
  }
  
  private continionVideoDetails() : void {
  this.localeStorgeService.setItem('VideoDetailsKay', this.queryId().toString())
  }

  private addCategoryInHistory(): void {
    const HistoryKey = "HistoryKey";
    const existingData = this.localeStorgeService.getItem(HistoryKey);
    const CategoriesData: CategoriesType[] = existingData ? JSON.parse(existingData) : [];

    const currentCategory = this.categoryDataById();
    if (currentCategory) {
      const existingIndex = CategoriesData.findIndex(category => category.id === currentCategory.id);
      if (existingIndex !== -1) {
      CategoriesData.splice(existingIndex, 1);
      }
      CategoriesData.unshift(currentCategory);
      this.localeStorgeService.setItem(HistoryKey, JSON.stringify(CategoriesData));
    }
  }
}

