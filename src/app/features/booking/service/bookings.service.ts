import { inject, Injectable } from '@angular/core';
import { SingleTonSupabaseService } from '../../../core/services/single-ton-supabase.service';
import {  map, Observable } from 'rxjs';
import { BookingType } from '../../../shared/interfaces/bookings';
import { AuthenticationService } from '../../auth/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private readonly TableBooking = "Bookings"
  private readonly singleTonSupaBaseService = inject(SingleTonSupabaseService);
  private readonly authService = inject(AuthenticationService);


  getBookings () :  Observable<BookingType[]> {
  return this.singleTonSupaBaseService.getData(this.TableBooking).pipe(
  map((bookings : unknown) => {
  const Bookings = (bookings as BookingType[])
  .filter((booking) => booking.user_id === this.authService.CurrentUser()?.user_id)
  return Bookings ;
  }));
  }


  postBooking (bookings : BookingType) : Observable<BookingType>{
  return this.singleTonSupaBaseService.postData(this.TableBooking , bookings);
  }

  updateBooking (id : number ,bookings : BookingType ) : Observable<BookingType> {
  return this.singleTonSupaBaseService.updateData(this.TableBooking , id , bookings) ;
  }

  deleteBooking (id : number) : Observable<void> {
  return this.singleTonSupaBaseService.deleteDataById(this.TableBooking , id) ;
  }
}
