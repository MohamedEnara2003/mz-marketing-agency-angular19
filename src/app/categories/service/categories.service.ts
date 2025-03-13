import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../core/services/single-ton-supabase.service';
import { filter, map, Observable } from 'rxjs';
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

  getCategoryById(id : number) : Observable<CategoriesType> {
  return this.singleTonSupaBaseService.getDataById(this.Table , id)
  }
  
}
