import { inject, Injectable, signal } from '@angular/core';
import { SingleTonSupabaseService } from '../../../../../core/services/single-ton-supabase.service';
import {  from, map, Observable} from 'rxjs';
import { CategoryLikeDislike } from '../../../../../shared/interfaces/thumbs';


@Injectable({
  providedIn: 'root'
})
export class ThumbsService {
  TableName = signal<string>('');
  private singleTonSupaBaseService = inject(SingleTonSupabaseService);

  upsertReaction(category_id: number, userId: string, reactionType: 'LIKE' | 'DISLIKE'): Observable<any> {
  const promise = this.singleTonSupaBaseService.supabase.from(this.TableName())
  .upsert(
    [{ category_id: category_id, user_id: userId, type: reactionType }],
    { onConflict: ['category_id','user_id'].toString() }
  )
  return from(promise)
  }

  getReactions(category_id : number)
  : Observable<CategoryLikeDislike[]> {
  const promise = this.singleTonSupaBaseService.supabase.from(this.TableName())
  .select('*')
  .eq('category_id', category_id);
  return from(promise).pipe(map((res ) => res.data!));
  }
  
  getUserReaction(category_id : number , user_id: string)
  : Observable<{type : 'LIKE' | 'DISLIKE' } > {
    const promise = this.singleTonSupaBaseService.supabase.from(this.TableName())
        .select('type')
        .eq('category_id', category_id)
        .eq('user_id', user_id)
        .maybeSingle() ;
      return from(promise).pipe(map((res) => res.data! )) 
  }

  removeReaction(categoryId : number , userId: string): Observable<void> {
    const promise = this.singleTonSupaBaseService.supabase
    .from(this.TableName())
    .delete()
    .match({category_id : categoryId, user_id: userId })
    return from(promise).pipe(map(() => {}))
  }


  listenToReactionsUpdate(): Observable<any> {
    return new Observable((observer) => {
      const subscription = this.singleTonSupaBaseService.supabase
        .channel(`public:${this.TableName()}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: this.TableName() },
          (payload) => observer.next(payload)
        )
        .subscribe();
      return () => {
        this.singleTonSupaBaseService.supabase.removeChannel(subscription);
      };
    });
  }

}

