import { Component,  ElementRef,  input, output, signal, viewChildren} from '@angular/core';
import { Comments } from '../../../../../../../shared/interfaces/categories';
import { UserImageComponent } from "../../../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { UserData } from '../../../../../../../core/models/user.model';
import { DayJsService } from '../../../../../../service/day-js.service';


@Component({
  selector: 'app-sent-comments',
  imports: [UserImageComponent , SharedModule],
  templateUrl: './sent-comments.component.html',
  styleUrl: './sent-comments.component.css'
})
export class SentCommentsComponent {
  
  comments = input.required<Comments[]>()
  isUser = input.required<UserData | null>()

  isEditActive_id = signal<number | null>(null);
  isEditActive = signal<boolean>(false);

  editCommentValue = signal<string>('') ;

  sindDeleteId = output<number>() ;
  updatedComment = output<Comments>() ;
  isEdit_id = signal<number | null>(null);
  
  inputRef = viewChildren<ElementRef<HTMLInputElement>>('inputRef');

  constructor(private dayJsService : DayJsService){
  }

  formatTime(timestamp: string): string {
  return this.dayJsService.formatTime(timestamp)
  }
  
  initCommentEditActive (id : number | null) : void {
  this.isEditActive.set(this.isEditActive_id() !== id ? true : false);
  this.isEditActive_id.set(this.isEditActive_id() !== id ? id : null);
  }


  private closeModleEditActive() : void {
  this.initCommentEditActive(null);
  }

  removeComment(id : number) : void {
  this.sindDeleteId.emit(id)
  this.closeModleEditActive();
  }
  
  changeCommentValue(newComment : string) : void {
  this.editCommentValue.set(newComment);
  }
  
  initEditComment(id : number , comment : string ) : void {
  this.closeModleEditActive();
  this.isEdit_id.set(id);
  this.editCommentValue.set(comment);
  }

  editComment(comment : Comments) : void {
  if(comment.comment !== this.editCommentValue()){
  const updatedCommentd : Comments = {...comment,comment : this.editCommentValue()};
  this.updatedComment.emit(updatedCommentd);
  }
  this.isEdit_id.set(null) ;
  }

  cancelComment() : void {
  this.isEdit_id.set(null) ;
  this.editCommentValue.set("");
  }  

}
