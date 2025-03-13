import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryHeaderComponent } from "./components/category-header/category-header.component";
import { CategoryNavsideComponent } from "./components/category-navside/category-navside.component";


@Component({
  selector: 'app-categories',
  imports: [RouterOutlet, CategoryHeaderComponent, CategoryNavsideComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
