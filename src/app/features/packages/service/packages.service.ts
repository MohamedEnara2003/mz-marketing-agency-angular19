import { inject, Injectable, signal } from '@angular/core';
import { SingleTonSupabaseService } from '../../../core/services/single-ton-supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PackagesType } from '../../../shared/interfaces/packages';
import { Selection } from '../../../shared/interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private tableName = "packages" ;
  private singleTonSupabseService = inject(SingleTonSupabaseService);

  private selectCategorySubject = new BehaviorSubject<Selection[]>([
    {id : 1 , selectName : 'video reels'},
    {id : 2 , selectName : 'motion graphics'} ,
    {id : 3 , selectName : 'designs'} ,
    {id : 4 , selectName : 'design logo'} ,
    {id : 5 , selectName : 'ux ui design'} ,
    {id : 6 , selectName : 'mobile application'} ,
    {id : 7 , selectName : 'web application'} ,
  ]);
  
  selectCategory$ = this.selectCategorySubject.asObservable();
  
  getPackages() : Observable<PackagesType[]> {
  return this.singleTonSupabseService.getData(this.tableName)
  }

}
