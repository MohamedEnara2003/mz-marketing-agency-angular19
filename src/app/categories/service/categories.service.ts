import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../core/services/single-ton-supabase.service';
import { from, map, Observable } from 'rxjs';
import { CategoriesType } from '../../shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly Table : string = "categories" ;
  private singleTonSupaBaseService = inject(SingleTonSupabaseService);

  getCategories(category : string) : Observable<CategoriesType[]> {
  return this.singleTonSupaBaseService.getData(this.Table).pipe(
  map((data : unknown) => {
  const categories = (data as CategoriesType[])
  .filter(res => res.category === category) ;
  return categories ;
  })
  );
  }

  getCategoriesValue() : Observable<string[]> {
  return this.singleTonSupaBaseService.getData(this.Table).pipe(
  map((data : unknown) => {
  const categories = (data as CategoriesType[]);

  const categoriesValues = categories.filter((prev, i) => {
  return i == categories.findIndex((cur) => prev.category === cur.category);
  }).map((res) => res.category);
  return categoriesValues ;
  })
  );
  }

  getCategoryById(id : number) : Observable<CategoriesType> {
  return this.singleTonSupaBaseService.getDataById(this.Table , id)
  }

}
