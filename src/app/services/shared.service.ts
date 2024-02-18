import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
    private showBookingsValue: any = new Subject();
  
    get showBookings(): any {
      return this.showBookingsValue;
    }
  
    setShowBookings(value: boolean) {
      
      this.showBookingsValue.next(value);
    }
  }
