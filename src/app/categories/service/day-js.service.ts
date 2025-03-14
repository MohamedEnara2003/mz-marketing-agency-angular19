import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


      dayjs.extend(relativeTime);
@Injectable({
  providedIn: 'root'
})
export class DayJsService {

    formatTime(timestamp: string): string {
      return dayjs(timestamp).fromNow(); 
    }
    
    
}
