import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../../../../../core/services/single-ton-supabase.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Comments } from '../../../../../../shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly Comments = "comments";
  private singleTonService = inject(SingleTonSupabaseService);

  
  getCommentsByCategoryId(category_id : number , user_id : string) : Observable<Comments[]> {
  return this.singleTonService.getData(this.Comments).pipe(
  map((data : unknown) => {
  const comments = (data as Comments[])
  .filter((comments) => comments.category_id === category_id)
  .sort((a , b) => a.user_id === user_id ? -1 : 0)
  ;
  return comments ;
  })
  )
  }
  
  postComment(comments : Comments) : Observable<Comments> {
  return this.singleTonService.postData(this.Comments ,comments);
  }
  
  updateComment(id : number ,updatedComment : Comments) : Observable<Comments> {
  return this.singleTonService.updateData(this.Comments , id ,updatedComment);
  }
  
  deleteComment(id : number) : Observable<void> {
  return this.singleTonService.deleteDataById(this.Comments, id) ;
  }

}
