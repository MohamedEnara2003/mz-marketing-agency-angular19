import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../../core/services/single-ton-supabase.service';
import { Observable } from 'rxjs';
import { PackagesType } from '../../../shared/interfaces/packages';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private tableName = "packages" ;
  private singleTonSupabseService = inject(SingleTonSupabaseService);

  getPackages() : Observable<PackagesType[]> {
  return this.singleTonSupabseService.getData(this.tableName)
  }

}
