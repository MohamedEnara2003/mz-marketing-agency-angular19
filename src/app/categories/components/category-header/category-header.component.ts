import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesService } from '../../service/categories.service';
import {takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwiperContainer } from 'swiper/element';


@Component({
  selector: 'app-category-header',
  imports: [SharedModule],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]

})
export class CategoryHeaderComponent {
  queryCategory = input.required<string | undefined>()
  categoriesValues = input.required<string[]>();
  swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');

  sliderNext() :void{
  this.swiperRef()?.nativeElement.swiper.slideNext();
  }
  
  sliderPrevious() :void{
    this.swiperRef()?.nativeElement.swiper.slidePrev();
  }
}
