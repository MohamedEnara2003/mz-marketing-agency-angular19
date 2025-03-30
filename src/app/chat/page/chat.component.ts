import { Component, effect, signal } from '@angular/core';
import { ChatHeaderComponent } from "../components/chat-header/chat-header.component";
import { ChatContainerComponent } from "../components/chat-container/chat-container.component";
import { ChatFormComponent } from "../components/chat-form/chat-form.component";
import { ChatService } from '../service/chat.service';
import { AuthenticationService } from '../../features/auth/service/authentication.service';
import {  ChatType, MessageType } from '../interface/chat.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [ChatHeaderComponent, ChatContainerComponent, ChatFormComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  chats = signal<ChatType[]>([]);
  receiver_id = signal<string>('') ;

  messagesData = signal<MessageType[]>([]);
  chatId = signal<number>(0);
  
  constructor(
  private chatService : ChatService ,
  private authService : AuthenticationService ,
  ){
  this.getChatsForAdmin ();
  this.initChat();
  this.listenForNewMessages();
  }

  private getChatsForAdmin () : void {
    const user_id = this.authService.CurrentUser()?.user_id ;
    if(user_id === this.chatService.Admin_id){
      this.chatService.getChatsForAdmin(user_id)
      .pipe(takeUntilDestroyed())
      .subscribe({
      next : (value) => {
        this.chats.set(value)
      }
    })
    }
  }

  selectChat(chat_id : number ,  receiver_id : string) : void {
  this.chatId.set(chat_id)
  this.receiver_id.set(receiver_id)
  this.getMessages (chat_id);
  }

  private initChat() : void {
  const user_id = this.authService.CurrentUser()?.user_id ;
  if(user_id && user_id !== this.chatService.Admin_id){
  this.chatService.getChatId(user_id , this.chatService.Admin_id).pipe(
  switchMap((chat_id) => {
  if(chat_id){
  this.getMessages (chat_id);
  this.chatId.set(chat_id);
  return EMPTY ;
  }else{
  return this.chatService.createChat(user_id, this.chatService.Admin_id);
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
    this.chatService.sendMessage(chatData).subscribe()
  }else{
    const chatData : MessageType = {
      sender_id : user_id,
      receiver_id : this.receiver_id(),
      chat_id : chat_id!,
      message : message,
      }
    this.chatService.sendMessage(chatData).subscribe()
  }
  }
  }

  private listenForNewMessages () : void {
  this.chatService.listenForNewMessages(1)
  .pipe(takeUntilDestroyed())
  .subscribe((update) => {
  if (update.eventType === 'INSERT' ){
  const updateNew : MessageType = {...update.new ,
  isSender : this.authService.CurrentUser()?.user_id === update.new.sender_id ? true : false 
  };
  this.messagesData.update((prev) => [...prev , updateNew])
  }
  })
  }
}
