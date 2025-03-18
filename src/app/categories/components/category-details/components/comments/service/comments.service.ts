import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../../../../../core/services/single-ton-supabase.service';
import { BehaviorSubject, map, Observable, switchMap, } from 'rxjs';
import { Comments } from '../../../../../../shared/interfaces/categories';
import { AuthenticationService } from '../../../../../../features/auth/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly Comments = "comments";
  private singleTonService = inject(SingleTonSupabaseService);
  private authService = inject(AuthenticationService);
  
  private countCommentSubject = new BehaviorSubject<number>(0);
  countComment$ = this.countCommentSubject.asObservable();

  private sortBySubject = new BehaviorSubject<string>("");  
  sortComment$ = this.sortBySubject.asObservable();


  getCommentsByCategoryId(category_id : number ) : Observable<Comments[]> {
  const commentsData  =  this.sortComment$.pipe(
    switchMap((sort) => {
    return this.singleTonService.getData(this.Comments ,{tableName : this.Comments , sortType : sort})
    }),
    map((data : unknown) => {
      const comments = (data as Comments[])
      .filter((comments) => comments.category_id === category_id)
      .sort((a , _) => a.user_id === this.authService.CurrentUser()?.user_id ? -1 : 0);
      return comments;
    })
    )

  return commentsData ;
  }

  getCountComments(category_id : number ) : Observable<number> {
  return this.singleTonService.getData(this.Comments).pipe(
  map((data : unknown) => {
  const comments = (data as Comments[])
  .filter((comments) => comments.category_id === category_id);
  return comments.length;
  })
  );
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
  
  listenToCommentsUpdates(): Observable<any> {
    return new Observable((observer) => {
      const subscription = this.singleTonService.supabase
        .channel('public:comments')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'comments' },
          (payload) => observer.next(payload)
        )
        .subscribe();

      return () => {
        this.singleTonService.supabase.removeChannel(subscription);
      };
    });
  }
  
  sortBy(sort : string)  {
  this.sortBySubject.next(sort);
  }

  initCountComment(vlaue : number) {
  return this.countCommentSubject.next(vlaue);
  }

  incrementCommentCount() {
  this.updateCommentCount(1);
  }

  decrementCommentCount() {
  this.updateCommentCount(-1);
  }

  private updateCommentCount(value : number) {
  this.countCommentSubject.next(this.countCommentSubject.value + value);
  }

}   
