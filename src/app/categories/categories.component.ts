import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
;
import { HeaderComponent } from "../shared/components/header/header.component";


@Component({
  selector: 'app-categories',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
