import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinnerService:NgxSpinnerService) {

   }

   busy () {
     this.busyRequestCount ++;
     this.spinnerService.show(undefined, {
       type: 'line-scale-party', // There are about 50 types ~> you can search them and choose a better one
       bdColor: 'rgba(255,255,255,0)',
       color: '#333333' // Gray
     })
   }

   idle () {
     this.busyRequestCount --;
     if(this.busyRequestCount <= 0){ // Just in case == safty mechanizm
       this.busyRequestCount = 0;
       this.spinnerService.hide();
     }
   }
}
