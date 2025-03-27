import { Injectable } from '@angular/core';
import { createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { from, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SingleTonSupabaseService {
  supabase : SupabaseClient ;

  constructor(){
  this.supabase = createClient(environment.supabaseUrl , environment.supabaseKey);
  }
  
  getData<G>(tableName : string , sortOption? : {tableName : string , sortType : string}) : Observable<G[]> {
  const promise = this.supabase.from(tableName).select('*',{count : 'exact'})

  if(sortOption && sortOption.tableName === tableName) {
  switch (sortOption.sortType) {
  case "NEWEST": promise.order('created_at' , {ascending : false});
  break;
  case "OLDEST": promise.order('created_at' , {ascending : true});
  }
  }
  return from(promise).pipe(map((res) => res.data!));
  }

  getDataById<G>(tableName : string , id : number) : Observable<G> {
  const promise = this.supabase.from(tableName).select('*').eq('id' , id).single()
  return from(promise).pipe(map((res) => res.data!)) ;
  }


  postData<G>(tableName : string , data : G) : Observable<G> {
  const promise = this.supabase.from(tableName).insert(data).select('*').single()
  return from(promise).pipe(map((result) => result.data! )) ;
  }

  updateData<G>(tableName : string ,id : number, data : G) : Observable<G> {
  const promise = this.supabase.from(tableName).update(data).match({id : id}).select('*').single()
  return from(promise).pipe(map((result) => result.data! )) ;
  }

  deleteDataById(tableName : string , id : number) : Observable<void> {
  const promise = this.supabase.from(tableName).delete().match({id : id}).single()
  return from(promise).pipe(map(() =>{})) ;
  }

 
}
