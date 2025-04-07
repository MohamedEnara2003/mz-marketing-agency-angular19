import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../core/services/single-ton-supabase.service';
import { from, map, Observable } from 'rxjs';
import { ChatType, ImagesFilesType, MessageType} from '../interface/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly TableChat : string = "chats";
  private readonly TableMessages : string = "messages";
  private readonly BucketName : string = "chatfiles";
  
  private singleTonSupabaseService  = inject(SingleTonSupabaseService);
  
  getChatsForAdmin(adminId: string): Observable<ChatType[]> {
    const promise = this.singleTonSupabaseService.supabase
      .from(this.TableChat)
      .select('*') 
      .eq('admin_id', adminId) 
      return from(promise).pipe(map((response) => response.data || []) ) 
  }

  getChatByIdForAdmin(chat_id : number, adminId: string): Observable<ChatType> {
    const promise = this.singleTonSupabaseService.supabase
      .from(this.TableChat)
      .select('*') 
      .eq('id', chat_id) 
      .eq('admin_id', adminId)
      .single() 
      return from(promise).pipe(map((response) => response.data!) ) 
  }

  getChatId(userId: string, adminId: string): Observable<number> {
    const promise = this.singleTonSupabaseService.supabase
        .from(this.TableChat)
        .select('id')
        .eq('user_id', userId)
        .eq('admin_id', adminId)
        .maybeSingle()
        return from(promise).pipe(map((res) => {
            const id = res.data?.id as number | undefined;
            return id ?? 0;
            }))
  }
  
  createChat(userId: string, adminId: string , email : string , userName : string , avatar_url? : string): Observable<ChatType> {
  const Chat : ChatType = {
    user_id: userId,
    admin_id: adminId,
    email: email,
    avatar_url : avatar_url!,
    userName:userName,
  }
  return this.singleTonSupabaseService.postData(this.TableChat, Chat)
  }


  getMassages (chatId : number , user_id : string) : Observable<MessageType[]> {
  const promise = this.singleTonSupabaseService.supabase
    .from(this.TableMessages)
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });
  return from(promise).pipe(map((res) => {
    const messages = (res.data as MessageType[]).map((message) => ({
      ...message,
      isSender: message.sender_id === user_id
    }));
    return messages;
  }));
  }

  sendMessage(messageData : MessageType) : Observable<MessageType> {
  return this.singleTonSupabaseService.postData(this.TableMessages , messageData)
  }

  uploadImage(file: File): Observable<ImagesFilesType> {
  return  this.singleTonSupabaseService.uploadImage(this.BucketName, file);
  }

  deleteStorgeImage(filePath: string): Observable<void> {
  return this.singleTonSupabaseService.deleteStorgeImage(this.BucketName, filePath);
  }

  listenForNewMessages(chatId: number): Observable<any> {
    return new Observable((observer) => {
      const subscription = this.singleTonSupabaseService.supabase
        .channel(`public:${this.TableMessages}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: this.TableMessages ,  filter: `chat_id=eq.${chatId}`},
          (payload) => observer.next(payload)
        ).subscribe();
      return () => {
        this.singleTonSupabaseService.supabase.removeChannel(subscription);
      };
    });
  }
}
