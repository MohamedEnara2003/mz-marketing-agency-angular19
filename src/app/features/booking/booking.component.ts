import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormBookingFeildComponent } from "./components/form-booking-feild/form-booking-feild.component";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from '../packages/service/packages.service';
import { Selection } from '../../shared/interfaces/shared';
import { of, switchMap, } from 'rxjs';
import { SelectComponent } from "../../shared/components/select/select.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingType, CategoryBookedType } from '../../shared/interfaces/bookings';
import { AuthenticationService } from '../auth/service/authentication.service';
import { BookingsService } from './service/bookings.service';
import { BookingSuccessComponent } from "./components/booking-success/booking-success.component";
import { LanguageService } from '../../core/services/language.service';


@Component({
  selector: 'app-booking',
  imports: [SharedModule, FormBookingFeildComponent, SelectComponent, BookingSuccessComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
languageService = inject(LanguageService) ;
form : FormGroup ;
selectCategory = signal<Selection[]>([]);
isSelect = signal<boolean>(false);
selectIndex = signal<number | null>(null);
iscategoryValid = signal<boolean>(false);
isBookingSuccess = signal<boolean>(false);

get categoriesValue() : FormArray{
  return this.form.get('categories') as FormArray
}
constructor(
private fb : FormBuilder ,
private bookingsService: BookingsService ,
private packageService : PackagesService ,
private authService : AuthenticationService
){
  this.getCategoriesValues();
}

ngOnInit(): void {
  this.initFormGroup ();
}

private getCategoriesValues() : void {
  this.packageService.selectCategory$.pipe(
  takeUntilDestroyed()
  ).subscribe((values) =>{
    this.selectCategory.set(values)
  })
}

  openSelectCategory (i : number | null) : void {
  this.isSelect.set(this.selectIndex() !== i ? true : false);
  this.selectIndex.set(this.selectIndex() !== i ? i : null);
  }
  
  getSelectValues (value : string) : void {
  this.categoriesValue.controls[this.selectIndex()!].get('category')?.setValue(value);
  this.openSelectCategory(null);
  }

  addCategory() : void {
    const categories = this.fb.group({
    category : [null, [Validators.required]] ,
    categoryDetails : [null] ,
    })
    this.categoriesValue.push(categories)
  }

  removeCategory (index : number) : void {
  this.categoriesValue.removeAt(index) ;
  }

private initFormGroup () : void {
  this.form = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    categories: this.fb.array([]),
  })
}

private initPostBooking () : void {
  const Form = this.form.getRawValue();
  const Categories  = this.form.controls['categories'].getRawValue();

  const Booking :BookingType= {
    fullName :  Form.fullName,
    phone : Form.phone ,
    email : Form.email ,
    user_id : this.authService.CurrentUser()?.user_id!,
    categories : Categories ,
  };
  this.bookingsService.postBooking(Booking).subscribe();
}

private setupExistingUserData () : void {
  const Form = this.form.getRawValue();
  const Categories = this.form.controls['categories'].getRawValue();

  this.bookingsService.getBookings()
  .pipe(
  switchMap((bookings) => {
  const existBooking = bookings.find((booking) => booking.email === Form.email 
  && booking.fullName === Form.fullName);
  existBooking?.categories.push(Categories)
  return of(existBooking)
  }),
  )
  .subscribe({
    next : (value) =>{
    if(value){
    this.bookingsService.updateBooking(value.id! , value).subscribe();
    }else{
    this.initPostBooking ();
    }
    },
    error : (err) => {console.log(err);},
    complete : () => {} ,
  })
}

onSubmit () : void {
  if(this.form.valid && this.categoriesValue.valid && this.categoriesValue.length > 0 ){
  this.setupExistingUserData();
  this.isBookingSuccess.set(true);
  }else{
  this.iscategoryValid.set(true)
  }
}
}
