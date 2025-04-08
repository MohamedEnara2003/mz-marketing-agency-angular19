import { Component, computed, CUSTOM_ELEMENTS_SCHEMA,   ElementRef,  input ,  signal,  viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { SwiperContainer } from 'swiper/element';
import { CategoriesService } from '../../service/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-category-header',
  imports: [SharedModule],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]

})
export class CategoryHeaderComponent {
  queryCategory = input.required<string | undefined>();
  categoriesValues = signal<string[]>([]);
  pathname = signal<string>(window.location.pathname) ;
  sortedCategoryValues = computed(() => 
  this.categoriesValues().sort((a , b) => a === this.queryCategory() ? -1 : 0)) ;
  swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');


  constructor(private categoriesService : CategoriesService ){
  this.getCategoriesValues ()
  }

  private getCategoriesValues () : void {
    this.categoriesService.getCategoriesValue()
    .pipe(takeUntilDestroyed())
    .subscribe((values) => {
    this.categoriesValues.set(values);
    })
  }
  
}
