import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PackagesService } from '../../service/packages.service';
import { PackagesType } from '../../../../shared/interfaces/packages';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { LocaleStorgeService } from '../../../../core/services/locale-storge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  imports: [SharedModule, LoadingComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  private readonly packageItemskay = "PackageItemskay" ;
  packages = signal<PackagesType[]>([]);

  constructor(
  private packageService : PackagesService,
  private localeStorgeService : LocaleStorgeService ,
  private router : Router
  
  ){
    this.getPackages()
  }
  
  private getPackages() : void {
    this.packageService.getPackages()
    .pipe(takeUntilDestroyed())
    .subscribe({
    next : (vlaue) => {
    this.packages.set(vlaue)
    },
    error : (err) => {
    console.log(err);
    },
    complete : () => {}
    })
  }

  getPackage(packageData : PackagesType) : void {
  const PackageItems = packageData.package
  .filter((category => category.isSupport === true))
  .map((data) => data.item);
  this.localeStorgeService.setItem(this.packageItemskay , JSON.stringify(PackageItems));
  this.router.navigate(['/',{outlets : {'booking-outlet': 'booking' , profile : null}}]);
  }

  
}
