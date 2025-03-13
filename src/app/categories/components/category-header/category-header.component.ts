import { Component } from '@angular/core';
import { UserComponent } from "../../../shared/components/user/user.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { LogoComponent } from "../../../shared/components/logo/logo.component";

@Component({
  selector: 'app-category-header',
  imports: [UserComponent, SearchBarComponent, LogoComponent],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.css'
})
export class CategoryHeaderComponent {

}
