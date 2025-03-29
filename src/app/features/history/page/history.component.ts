import { Component , effect , OnInit, signal, viewChildren } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { LocaleStorgeService } from '../../../core/services/locale-storge.service';
import { CategoriesType } from '../../../shared/interfaces/categories';
import { CategoryViewComponent } from "../../../categories/components/category-view/category-view.component";
import { Router } from '@angular/router';
import { ThumbsComponent } from "../../../categories/components/category-details/components/thumbs/thumbs.component";

@Component({
  selector: 'app-history',
  imports: [SharedModule, CategoryViewComponent, ThumbsComponent],
  templateUrl: './history.component.html',
  styles: ``
})
export class HistoryComponent implements OnInit {
  private readonly HistoryKay : string = "HistoryKey" ;
  categoriesHistory = signal<CategoriesType[]>([]);
  category_id = signal<number | null>(null);

  videosDurations = signal<number[]>([]);
  categoryViewComponent = viewChildren<CategoryViewComponent>(CategoryViewComponent);
  
  isLoadList = signal<number>(0) ;
  constructor(
  private localeStorgeService : LocaleStorgeService ,
  private router : Router ,
  ){
  effect(() => {
  this.initVideosRef () ; 
  })
  }

  ngOnInit(): void {
  this.getCategoriesHistory ();
  }

  private getCategoriesHistory () : void {
  if(this.HistoryKay in localStorage){
  const categoriesHistory : CategoriesType[] = JSON.parse(this.localeStorgeService.getItem(this.HistoryKay)!);
  this.categoriesHistory.set(categoriesHistory);
  }
  }
  
  hoverCategoriesHistory (id : number | null) : void {
  this.router.navigate(['history'] ,{queryParams : {id : id}}) ;
  this.category_id.set(id);
  }

  private initVideosRef () : void {
    const durations : number[] = [] ; 
    this.categoryViewComponent().map((categoryView , index) => {
    durations[index] = categoryView.duration() ;
    this.videosDurations.set([...durations]);
    })
  }

  removeHistoryItem(id : number) : void {
  this.categoriesHistory.set(this.categoriesHistory().filter((category) => category.id !== id));
  this.localeStorgeService.setItem(this.HistoryKay ,JSON.stringify(this.categoriesHistory()));
  }
}
