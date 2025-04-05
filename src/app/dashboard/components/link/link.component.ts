import { Component, input } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-link',
  imports: [SharedModule],
  template : `
  
  <li class="w-full">
    <a [routerLink]="[path()]" routerLinkActive="bg-zinc-700 rounded-box shadow-md shadow-zinc-900  " 
    [routerLinkActiveOptions]="{ exact: true }"
    class="w-full text-gray-50 flex gap-2 justify-start items-center p-1 hover:bg-zinc-700  duration-200">
    <span class="size-8 rounded-full bg-mz-primary   flex justify-center items-center">
    <span class="size-8 rounded-full bg-mz-primary  flex justify-center items-center">
    <ng-content />
    </span>
    </span>
    {{linkName() | translate}}
    </a>
    </li>
  `
})
export class LinkComponent {
  path = input<string>('/');
  linkName = input<string>('');
}
