import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesService } from '../../service/categories.service';
import {takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
  
}
