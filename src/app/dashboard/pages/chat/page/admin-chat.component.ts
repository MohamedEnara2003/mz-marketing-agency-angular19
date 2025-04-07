import { Component,ElementRef, signal, viewChild } from '@angular/core';
import { UsersMessagesComponent } from "../components/users-messages/users-messages.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ChatService } from '../../../../chat/service/chat.service';
import { ChatType, ImagesFilesType, MessageType } from '../../../../chat/interface/chat.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '../../../../features/auth/service/authentication.service';
import { ChatHeaderComponent } from "../../../../chat/components/chat-header/chat-header.component";
import { ChatContainerComponent } from "../../../../chat/components/chat-container/chat-container.component";
import { ChatFormComponent } from "../../../../chat/components/chat-form/chat-form.component";
import { ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap, timer } from 'rxjs';
import { LogoComponent } from "../../../../shared/components/logo/logo.component";

@Component({
  selector: 'app-admin-chat',
  imports: [UsersMessagesComponent, SharedModule, ChatHeaderComponent, ChatContainerComponent, ChatFormComponent, LogoComponent],
  templateUrl: './admin-chat.component.html',
  styles: ``
})
export class AdminChatComponent {

  chatUser = signal<ChatType | undefined>(undefined);
  chats = signal<ChatType[]>([]);

  messages = signal<MessageType[]>([]);
  chatId = signal<number>(0);
  receiver_id = signal<string>('');
  chatContainer = viewChild<ChatContainerComponent>('chatContainer');
  

  constructor(
  private chatService : ChatService ,
  private authService : AuthenticationService ,
  private activatedRoute : ActivatedRoute,
  ){
    this.getChatsForAdmin();
    this.getMessages();
    this.listenForNewMessages() ; 
  }

  private getChatsForAdmin () : void {
    const user_id = this.authService.CurrentUser()?.user_id ;
    if(user_id === this.authService.Admin_id){
      this.chatService.getChatsForAdmin(user_id)
      .pipe(takeUntilDestroyed())
      .subscribe({
      next : (chats ,) => {
      this.chats.set(chats);
      const chatById = chats.find((chat) => chat.id === this.chatId());
      this.chatUser.set(chatById);
      }
    })
    }
  }

  private getMessages () : void {
  combineLatest([
  this.activatedRoute.paramMap,  this.activatedRoute.queryParamMap,
  ]).pipe(
  switchMap(([paramMap, queryParamMap])  => {
  const chat_id = +paramMap.get('chatId')! || 0 ;
  const receiver_id = queryParamMap.get('receiver-id') || '' ;
  if(chat_id && receiver_id){
  const chatById = this.chats().find((chat) => chat.id === chat_id);
  this.chatUser.set(chatById);
  }
  this.chatId.set(chat_id);
  this.receiver_id.set(receiver_id);

  return this.chatService.getMassages(chat_id, this.authService.Admin_id);
  }),
  takeUntilDestroyed()
  ).subscribe((value) => {
  this.messages.set(value);
  this.initChatScroll();
  
  })
  }



  sendMessage (interaction : {message : string , files : ImagesFilesType[]} ) : void {
    if(this.chatId() && this.receiver_id() !== '') {

      const existingChatData : MessageType = {
        sender_id : this.authService.Admin_id ,
        receiver_id : this.receiver_id() ,
        chat_id : this.chatId(),
        message : interaction.message ,
      }
        if(interaction.files.length > 0 ){
          interaction.files.map((image , i) => {
          const chatData : MessageType = {
            ...existingChatData ,
            message :  i === 0 ? interaction.message : '',
            image_url : image.imagePath,
        }
        this.chatService.sendMessage(chatData).subscribe() 
        })
      }else{
      this.chatService.sendMessage(existingChatData).subscribe();
      }
    }
  }

  private listenForNewMessages () : void {
    this.chatService.listenForNewMessages(this.chatId())
    .pipe(takeUntilDestroyed())
    .subscribe((update) => {
    if (update.eventType === 'INSERT' ){
    const updateNew : MessageType = {...update.new ,
    isSender : this.authService.CurrentUser()?.user_id === update.new.sender_id ? true : false 
    };
    this.messages.update((prev) => [...prev , updateNew]);
    if(updateNew){
    this.initChatScroll();
    }
    }
    })
    }

    private initChatScroll(): void {
      timer(30).subscribe(() =>{
        const container = this.chatContainer()?.chatContainer()?.nativeElement;
        if(container ){
          container.scrollTop = container.scrollHeight;
        }
      })
    }



}