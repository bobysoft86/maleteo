import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private ignoreAuthentication = false;

  setIgnoreAuthentication(value:boolean):void{
    this.ignoreAuthentication
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    return token !==null && token!==undefined && token!=="";
  }
}
