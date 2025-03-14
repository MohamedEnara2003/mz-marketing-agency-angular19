import { Component, effect, ElementRef,input,  signal, viewChild } from '@angular/core';
import {  Comments } from '../../../../../shared/interfaces/categories';
import { AuthenticationService } from '../../../../../features/auth/service/authentication.service';
import { UserImageComponent } from "../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { CommentsService } from './service/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SentCommentsComponent } from "./components/sent-comments/sent-comments.component";
import { UserData } from '../../../../../core/models/user.model';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-comments',
  imports: [UserImageComponent, SharedModule, SentCommentsComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  queryId = signal<number>(0) 

  inputRef = viewChild<ElementRef<HTMLElement>>('inputRef');
  isFocus = signal<boolean>(false) ;
  commentValue = signal<string>('') ;
  commentsData = signal<Comments[]>([]) ;
  UserData = signal<UserData | null>(null)
  countComments = signal<number>(0);

  constructor(
  private authService  : AuthenticationService ,
  private commentsService : CommentsService ,
  private router : Router,
  private activtedRoute : ActivatedRoute
  ){
  effect(()=> {
  this.initFocus();
  this.UserData.set(authService.CurrentUser())
  });
  
  this.initSubscription();
  this.getCountComments();
  }
  
  private initSubscription() : void {
    this.activtedRoute.queryParamMap.pipe(
    switchMap((queryParamMap) => {
    const id = +queryParamMap.get('id')!;
    this.queryId.set(id);
    this.commentsService.getCountComments(id).subscribe((value) => {
    this.commentsService.initCountComment(value)
    })
    return this.commentsService.getCommentsByCategoryId(id , this.UserData()?.user_id!);
    }),
    takeUntilDestroyed()
    ).subscribe({
      next : (vlaue) => {
      this.commentsData.set(vlaue);
      },
      error : (err) => {
      console.log(err);
      },
      complete : () =>{}
    })
    }

  private getCountComments() : void {
    this.commentsService.countComment$.pipe(takeUntilDestroyed()).subscribe((value) => {
    this.countComments.set(value);
    })
  }

    addComment() : void {
      if(this.authService.CurrentUser()){
      const Comments : Comments = {
      category_id : this.queryId()!,
      user_id : this.authService.CurrentUser()?.user_id! ,
      userName : this.authService.CurrentUser()?.userName! ,
      email :  this.authService.CurrentUser()?.email!,
      picture : this.authService.CurrentUser()?.picture!,
      comment : this.commentValue(),
      }
      this.commentsService.postComment(Comments).subscribe((data) => {
      this.commentsData().push(data);
      this.commentsService.incrementCommentCount();
      });
      this.initComment();
      }else{
      this.router.navigate([{outlets : {loginIn: 'loginIn' , register : null}}]);
      }
      }
    
      initRemoveComment(id : number) : void {
      if(id){
      this.commentsService.deleteComment(id).subscribe(() => {
      this.commentsData.set(this.commentsData().filter((comment) => comment.id !== id));
      this.commentsService.decrementCommentCount()
      })
      }
      }
      
      initEditComment(updatedComment: Comments) : void {
      if(updatedComment){
      const index =  this.commentsData().findIndex((currentData) => currentData.id === updatedComment.id)
      this.commentsService.updateComment(updatedComment.id! , updatedComment).subscribe(() => {
      this.commentsData()[index] = updatedComment ;
      })
      }
      }

  private initFocus() : void {
  if(this.isFocus()){
  this.inputRef()?.nativeElement.focus();
  };
  }
  
  initComment () : void {
  this.isFocus.set(!this.isFocus());
  this.commentValue.set("");
  }
  
  changeValue (value : string) : void {
  this.commentValue.set(value)
  }
  
}
