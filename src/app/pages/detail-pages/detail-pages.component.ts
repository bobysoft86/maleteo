import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { user } from '../../interfaces/user_interface';
import { ServicesService } from '../../services/services.service';
import { SharedService } from '../../services/shared.service';
import { AuthenticateService } from '../../services/authenticate.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-detail-pages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-pages.component.html',
  styleUrls: ['./detail-pages.component.css']
})
export class DetailPagesComponent {
  id!:string | null;
  user!:user;
  constructor(private router:Router, private authService: AuthenticateService, private servicio:ServicesService,private rutaActivada: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit(): void {
    
    this.id = localStorage.getItem('id_user');
    this.getData();



  const token = localStorage.getItem("token");
        console.log('Token de autenticación:', token);
    
        this.authService.authenticate(token!).subscribe(
          (response) => {
            console.log('Autenticación exitosa', response);
          },
          (error) => {
            console.error('Error de autenticación', error);
            this.router.navigate(['/registro']);
          }
        );

}
logOut():void{
  localStorage.removeItem('token');
  this.router.navigate(['registro']);

}

getData(){
  this.servicio.getUserId(this.id).subscribe((data:any) => {
    console.log("esto es el data del user: ",data.data)
    this.user = data.data;

    console.log ("estas son las estaciones" ,this.user.estaciones);
    console.log("estas son las reservas de este user:", this.user.estaciones.bookings);
    if(this.user.estaciones.bookings !==null || this.user.estaciones.bookings!=="" || !this.user.estaciones.bookings|| this.user.estaciones.bookings !== undefined){
    
      this.sharedService.setShowBookings(true);
    }
  },
  (error: any) => {
    console.error('Error fetching user data:', error);
    }
);
}
aceptarReserva():void{
  console.log("reservar funciona");
  
}
eliminarReserva():void{
  console.log("eliminar funciona");
  
}
}
