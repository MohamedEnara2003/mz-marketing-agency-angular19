import { Component,ElementRef,signal, viewChild } from '@angular/core';
import { ChatHeaderComponent } from "../components/chat-header/chat-header.component";
import { ChatContainerComponent } from "../components/chat-container/chat-container.component";
import { ChatFormComponent } from "../components/chat-form/chat-form.component";
import { ChatService } from '../service/chat.service';
import { AuthenticationService } from '../../features/auth/service/authentication.service';
import {  MessageType } from '../interface/chat.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [ChatHeaderComponent, ChatContainerComponent, ChatFormComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {

  messagesData = signal<MessageType[]>([]);
  chatId = signal<number>(0);
  
  chatContainer = viewChild<ChatContainerComponent>('chatContainer');

  constructor(
  private chatService : ChatService ,
  private authService : AuthenticationService ,
  ){
  this.initChat();
  }

  private initChat() : void {
  const userData = this.authService.CurrentUser() ;
  if(userData && userData.user_id !== this.chatService.Admin_id){
  this.chatService.getChatId(userData.user_id , this.chatService.Admin_id).pipe(
  switchMap((chat_id) => {
  if(chat_id){
  this.getMessages (chat_id);
  this.listenForNewMessages(chat_id);
  this.chatId.set(chat_id);
  return EMPTY ;
  }else{
  return this.chatService.createChat(
  userData.user_id, this.chatService.Admin_id , userData.email , userData.userName, userData.picture);
  }
  }),
  takeUntilDestroyed()
  ).subscribe()
  }
  }

  private getMessages (chatId : number) : void {
    const user_id = this.authService.CurrentUser()?.user_id;
    if(user_id) {
      this.chatService.getMassages(chatId , user_id)
      .subscribe({
      next : (value) => {        
      this.messagesData.set(value)
      },
      error : (err) => {console.log(err)} ,
      complete : ()=> {} ,
      })
    
    }
  }

  sendMessage (message : string) : void {
  const user_id = this.authService.CurrentUser()?.user_id ;
  const chat_id = this.chatId() ;
  if(user_id && chat_id){
  if(user_id !== this.chatService.Admin_id ){
    const chatData : MessageType = {
      sender_id : user_id,
      receiver_id : this.chatService.Admin_id  ,
      chat_id : chat_id !,
      message : message,
      }
    this.chatService.sendMessage(chatData).subscribe();
  }
  }
  }


  private listenForNewMessages (chat_id : number) : void {
  this.chatService.listenForNewMessages(chat_id)
  .subscribe((update) => {
  if (update.eventType === 'INSERT' ){
  const updateNew : MessageType = {...update.new ,
  isSender : this.authService.CurrentUser()?.user_id === update.new.sender_id ? true : false 
  };
  this.messagesData.update((prev) => [...prev , updateNew]);
  if(updateNew){
  this.initChatScroll();
  }
  }
  })
  }

  
  private initChatScroll(): void {
    timer(50).subscribe(() =>{
      const container = this.chatContainer()?.chatContainer()?.nativeElement;
      if(container){
        container.scrollTop = container.scrollHeight;
      }
    })
  
  }
} 
