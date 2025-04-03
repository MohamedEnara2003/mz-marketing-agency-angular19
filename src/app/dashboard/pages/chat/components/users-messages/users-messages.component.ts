import { Component, input } from '@angular/core';
import { ChatType } from '../../../../../chat/interface/chat.interface';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-users-messages',
  imports: [SharedModule],
  templateUrl: './users-messages.component.html',
  styleUrl: './users-messages.component.css'
})
export class UsersMessagesComponent {
  chats = input.required<ChatType[]>();
 
  
}
