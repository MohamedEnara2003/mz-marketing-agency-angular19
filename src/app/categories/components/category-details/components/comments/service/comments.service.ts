import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../../../../../core/services/single-ton-supabase.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Comments } from '../../../../../../shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly Comments = "comments";
  private singleTonService = inject(SingleTonSupabaseService);
  
  private countCommentSubject = new BehaviorSubject<number>(0);
  countComment$ = this.countCommentSubject.asObservable();
  
  getCommentsByCategoryId(category_id : number , user_id : string) : Observable<Comments[]> {
  return this.singleTonService.getData(this.Comments).pipe(
  map((data : unknown) => {
  const comments = (data as Comments[])
  .filter((comments) => comments.category_id === category_id)
  .sort((a , _) => a.user_id === user_id ? -1 : 0)
  ;
  return comments ;
  })
  )
  }

  getCountComments(category_id : number ) : Observable<number> {
  return this.singleTonService.getData(this.Comments).pipe(
  map((data : unknown) => {
  const comments = (data as Comments[])
  .filter((comments) => comments.category_id === category_id);
  return comments.length ;
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
  

  initCountComment(vlaue : number) {
  return this.countCommentSubject.next(vlaue);
  }

  incrementCommentCount() {
  this.updateCommentCount(1)
  }

  decrementCommentCount() {
  this.updateCommentCount(-1)
  }

  updateCommentCount(value : number) {
  this.countCommentSubject.next(this.countCommentSubject.value + value);
  }

}   
