import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PackagesService } from '../../service/packages.service';
import { PackagesType } from '../../../../shared/interfaces/packages';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-packages',
  imports: [SharedModule, LoadingComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  packages = signal<PackagesType[]>([]);
  constructor(private packageService : PackagesService){
    this.getPackages()
  }
  
  private getPackages() : void {
    this.packageService.getPackages().pipe(takeUntilDestroyed()).subscribe({
    next : (vlaue) => {
    this.packages.set(vlaue)
    },
    error : (err) => {
    console.log(err);
    },
    complete : () => {}
    })
  }
}
