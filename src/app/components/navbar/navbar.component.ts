import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  showBookingsValue: boolean = false;
  showNavbar: boolean = false; 
  scrollTimeout: any;

  constructor(private sharedService:SharedService){}
  ngOnInit(){
    this.sharedService.showBookings.subscribe((value:any)=>{
      
      this.showBookingsValue=value;
    });
    console.log(this.showBookingsValue);
    
  }


}
