import { Component,OnInit,signal, viewChild } from '@angular/core';
import { ChatHeaderComponent } from "../components/chat-header/chat-header.component";
import { ChatContainerComponent } from "../components/chat-container/chat-container.component";
import { ChatFormComponent } from "../components/chat-form/chat-form.component";
import { ChatService } from '../service/chat.service';
import { AuthenticationService } from '../../features/auth/service/authentication.service';
import { MessageType } from '../interface/chat.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY,  switchMap, timer } from 'rxjs';
import { SharedModule } from '../../shared/modules/shared.module';
import { LocaleStorgeService } from '../../core/services/locale-storge.service';

@Component({
  selector: 'app-chat',
  imports: [SharedModule ,ChatHeaderComponent, ChatContainerComponent, ChatFormComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit{
  private readonly ImagesFilesKay = 'ImagesFilesKay' ;
  messagesData = signal<MessageType[]>([]);
  chatId = signal<number>(0);
  chatContainer = viewChild<ChatContainerComponent>('chatContainer');
  imageUrl = signal<string>('');
  images  = signal<string[]>([]); 
  
  constructor(
  private chatService : ChatService ,
  private authService : AuthenticationService ,
  private loclaeStorageService : LocaleStorgeService,
  ){
  this.initChat();
  }

  ngOnInit(): void {
    this.getImgaesFile();

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

  const existingChatData : MessageType = {
    sender_id : user_id,
    receiver_id : this.chatService.Admin_id  ,
    chat_id : chat_id,
    message :  message ,
  }
    if(this.images().length > 0 ){
      this.images().map((image , i) => {
      const chatData : MessageType = {
        ...existingChatData ,
        message :  i === 0 ? message : '',
        image_url : image,
    }
    this.chatService.sendMessage(chatData).subscribe() 
    })
  }else{
  this.chatService.sendMessage(existingChatData).subscribe();
  }
  }
  }
  }
  
  private getImgaesFile () : void {
  if(this.ImagesFilesKay in localStorage){
  const images : string[] = JSON.parse(this.loclaeStorageService.getItem(this.ImagesFilesKay)!);
  this.images.set(images);
  }
  }

  uploadImage (file : File) : void {
  this.chatService.uploadImage(file)
  .subscribe((imagePath) => {
  const imagesArr = [imagePath] ;
  const existingImages : string[] = JSON.parse(this.loclaeStorageService.getItem(this.ImagesFilesKay)!);
  if(!existingImages){
  this.loclaeStorageService.setItem(this.ImagesFilesKay , JSON.stringify(imagesArr));
  this.images.set(imagesArr)
  }else{
  const newImages = [...existingImages , ...imagesArr] ;
  this.loclaeStorageService.setItem(this.ImagesFilesKay , JSON.stringify(newImages));
  this.images.set(newImages);
  }
  })
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
    timer(30).subscribe(() =>{
      const container = this.chatContainer()?.chatContainer()?.nativeElement;
      if(container){
        container.scrollTop = container.scrollHeight;
      }
    })
  
  }
} 
