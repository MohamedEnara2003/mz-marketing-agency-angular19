import { Component, computed, CUSTOM_ELEMENTS_SCHEMA,   ElementRef,  input ,  signal,  viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { SwiperContainer } from 'swiper/element';


@Component({
  selector: 'app-category-header',
  imports: [SharedModule],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]

})
export class CategoryHeaderComponent {
  queryCategory = input.required<string | undefined>();
  categoriesValues = input.required<string[]>();
  pathname = signal<string>(window.location.pathname) ;
  sortedCategoryValues = computed(() => 
  this.categoriesValues().sort((a , b) => a === this.queryCategory() ? -1 : 0)) ;
  swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');
}
