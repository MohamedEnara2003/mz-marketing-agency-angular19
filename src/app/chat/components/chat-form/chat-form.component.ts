import { Component, CUSTOM_ELEMENTS_SCHEMA,  ElementRef,  OnInit, output, signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ChatContainerComponent } from '../chat-container/chat-container.component';
import { LocaleStorgeService } from '../../../core/services/locale-storge.service';
import { ChatService } from '../../service/chat.service';
import { ImagesFilesType } from '../../interface/chat.interface';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat-form',
  imports: [SharedModule],
    schemas : [CUSTOM_ELEMENTS_SCHEMA] ,
  template :`
  <form class=" w-full flex flex-col justify-evenly items-center gap-1 py-2 bg-mz-secound" 
  (ngSubmit)="sendMessage()">
  
  <header *ngIf="images().length > 0" class="absolute w-full  bottom-14  flex-col  
  flex justify-center items-start animate-down bg-mz-secound border-t-1 border-gray-50 py-1">

      <swiper-container
    #swiperRef
    slides-per-view="4"
    spaceBetween = "10"
    [breakpoints]="{
          '0':   {slidesPerView: 2 },
          '370': {slidesPerView: 2 },
          '540': {slidesPerView: 3 },
          '1024':{slidesPerView: 4 },
          '1536':{slidesPerView: 5 }
        }"
    [speed]="200"
    class="w-[70%] px-3">
    
        @for (file of images(); track file ; let index = $index) {
        <swiper-slide class="size-20 ">
        <div class="relative z-10 w-full md:w-[80%] h-full 
        object-cover rounded-3xl border-1 border-mz-primary bg-zinc-500  animate-up">
        <img [src]="file.imagePath" alt="Image 1" class="absolute z-0 w-full h-full rounded-3xl" />
        <button (click)="removeImageFile(index, file.imageName)" type="button" class="btn btn-xs   btn-circle absolute right-0 bg-[#333] z-50">
        <i class="fa-solid fa-close  text-gray-50 text-sm "></i>
        </button>
        </div>
        </swiper-slide>
      }
    </swiper-container>
    
  </header>

  <div class="w-full flex justify-evenly items-center">

  <div>
  <label for="fileKay">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-6 text-gray-50 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
  <input type="file" name="file" id="fileKay" class="hidden" (change)="uploadFile($event)" accept="image/*" />
  </label>
  </div>

  <input  type="text"  [ngModel]="message()" (ngModelChange)="onChangeValue($event)" 
  name="massage" id="massage"
  class="w-[80%] md:w-[85%]  text-gray-900 placeholder:text-gray-500 input input-neutral focus:outline-mz-primary
  bg-gray-50 border-transparent outline-gray-400 outline-2 " 
  placeholder="your massage..." 
  />

  <button type="submit" [disabled]="message().length <= 0 && images().length <= 0 ? true : false" 
  class="cursor-pointer">
  @if(message().length <= 0 && images().length <= 0) {
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-6 text-gray-50">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
  }@else {
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
  class="size-6 text-gray-50 cursor-pointer">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
  }
  </button>
  </div>

  <audio  #audioRef  class="hidden">
    <source [src]="audioSrc" type="audio/mpeg">
    </audio>
  </form>
  `
})
export class ChatFormComponent implements OnInit{
  private readonly ImagesFilesKay = 'ImagesFilesKay' ;
  message = signal<string>('');
  postMessage = output<{message : string , files : ImagesFilesType[]}>()
  postImages = output<string>()
  
  images = signal<ImagesFilesType[]>([]);
  chatContainer = viewChild<ChatContainerComponent>(ChatContainerComponent);

  readonly audioSrc = "https://kzzljjlggloknteiirlr.supabase.co/storage/v1/object/sign/assets/audioo.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvYXVkaW9vLndhdiIsImlhdCI6MTc0Mzc1MDY5NCwiZXhwIjoxNzc1Mjg2Njk0fQ.ILiimV3N513cNauqqPYnzkPciQcXtF_5rDttD-1aszA";
  audioRef = viewChild<ElementRef<HTMLAudioElement>>('audioRef');
  isPlay  = signal<boolean>(false);

  constructor(
  private chatService : ChatService ,
  private localeStorageService : LocaleStorgeService ,
  ) {}
  
  ngOnInit(): void {
  this.getImgaesFile();
  }

  private getImgaesFile () : void {
    if(this.ImagesFilesKay in localStorage){
    const images : ImagesFilesType[] = JSON.parse(this.localeStorageService.getItem(this.ImagesFilesKay)!);
    this.images.set(images);
    }
  }

  onChangeValue(value : string) : void  {
  this.message.set(value);
  }
  
  sendMessage () : void {
  this.postMessage.emit({message : this.message() , files : this.images()});
  this.message.set('');

  this.localeStorageService.removeItem(this.ImagesFilesKay);
  this.images.set([]);
  this.playAudio ();
  }

  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

        this.chatService.uploadImage(file)
        .subscribe((imageFile) => {
        const imagesArr : ImagesFilesType[] = [imageFile] ;
        const existingImages : ImagesFilesType[] = JSON.parse(this.localeStorageService.getItem(this.ImagesFilesKay)!);
        if(!existingImages){
        this.localeStorageService.setItem(this.ImagesFilesKay , JSON.stringify(imagesArr));
        this.images.set(imagesArr)
        }else{
        const newImages = [...existingImages , ...imagesArr] ;
        this.localeStorageService.setItem(this.ImagesFilesKay , JSON.stringify(newImages));
        this.images.set(newImages);
        }
        })
    }
  }

  removeImageFile(index : number , fileName : string) : void {
  const existingImages : ImagesFilesType[] = JSON.parse(this.localeStorageService.getItem(this.ImagesFilesKay)!) ;
  const newImages = existingImages.filter((_: ImagesFilesType, i: number) => i !== index);
  this.localeStorageService.setItem(this.ImagesFilesKay, JSON.stringify(newImages));
  this.chatService.deleteStorgeImage(fileName).subscribe()
  this.images.set(newImages);
  }
  



    private playAudio () : void {
      const audioRef = this.audioRef()?.nativeElement;
      if(audioRef){
        if(audioRef.paused){
          audioRef.volume = 0.4;
          audioRef.currentTime = 0;
          audioRef.play();
        }
    timer(2000).subscribe(() => audioRef.pause());
      }
    }
}
