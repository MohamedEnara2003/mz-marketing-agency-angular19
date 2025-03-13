import { Component, signal } from '@angular/core';
import { LinksComponent } from "../../../shared/components/links/links.component";
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-category-navside',
  imports: [LinksComponent , SharedModule],
  templateUrl: './category-navside.component.html',
  styleUrl: './category-navside.component.css'
})
export class CategoryNavsideComponent {
  isWidthSide = signal<boolean>(true) ;

  initWidthNavSide() : void {
  this.isWidthSide.set(!this.isWidthSide());
  }

}
