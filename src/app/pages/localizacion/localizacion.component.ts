import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { user } from '../../interfaces/user_interface';
import { RouterLink, Router } from '@angular/router';
import { Map, marker, tileLayer, icon } from 'leaflet';
import { AuthenticateService } from '../../services/authenticate.service';

import swal from 'sweetalert';


@Component({
  selector: 'app-localizacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './localizacion.component.html',
  styleUrl: './localizacion.component.css',
})
export class LocalizacionComponent implements OnInit {
  allusers!: any[];
  selectedLockerName: string = '';
  selectedLockerCapacity: string = '';
  selectedLockerPropertySpace: string = '';
  selectedLockerImg: string = '';
  selectedLockerAvi: boolean = true;
  selectedPropertyTipe: string = '';
  lat: any;
  lon: any;

  isLoading = true;


  constructor(private router:Router, private servicio: ServicesService,private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.servicio.getAllUsers().subscribe((data: any) => {
      this.allusers = data;
      console.log('soy all', this.allusers);
      this.getLocation();
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
  

    });
  }



  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // alert(position.coords.latitude + ' ' + position.coords.longitude); // alerta de posicion
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.createMap();
      });
    }
  }

  createMap(): void {
    this.isLoading = true;

    const map = new Map('map').setView([41.3851, 2.1734], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    this.isLoading = false;

    
    const myLocationIcon = icon({
      iconUrl: '../../../assets/icons8-location-pin-32.png', 
      iconSize: [32, 32], 
      iconAnchor: [16, 32], 
    });

    const markerGeoloc = marker([
      this.lat,
      this.lon,
    ], {
      icon: myLocationIcon 
    })
      .addTo(map)
      .bindPopup(`Tu ubicación`)
      .openPopup();

    this.allusers.forEach((element) => {
      const markerItem = marker([
        element.latitude,
        element.longitude,
      ])
        .addTo(map)
        .bindPopup(`soylocker ${element.name}`)
        .openPopup();

      markerItem.on('click', () => {
        this.selectedLockerName = element.name;
        this.selectedLockerCapacity = element.capacity;
      this. selectedLockerImg = element.img;
       this.selectedLockerAvi = element.aviable;
       this.selectedLockerPropertySpace = element.propertySpace;
       this.selectedPropertyTipe = element.propertyTipe;
       localStorage.setItem("selectedLockeId", element._id )      
      });


    });
  }
}
