import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services.service';
import { Map, marker, tileLayer, icon } from 'leaflet';

@Component({
  selector: 'app-ads-detail',
  standalone: true,
  imports: [],
  templateUrl: './ads-detail.component.html',
  styleUrl: './ads-detail.component.css'
})
export class AdsDetailComponent implements OnInit {
  establecimiento:any;

  constructor(private route: ActivatedRoute, private servicesService: ServicesService){}
  ngOnInit(): void {
      this.route.paramMap.subscribe(params=>{
        const id = params.get('id');
        if(id){
          this.servicesService.getEstablecimientoById(id).subscribe(establecimiento=>{
            this.establecimiento = establecimiento;
            console.log(establecimiento);
          })
        }
        this.createMap()
      })
  }
  createMap(): void {

    const map = new Map('map').setView([41.3851, 2.1734], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    
    

  //   const markerGeoloc = marker([
  //     this.lat,
  //     this.lon,
  //   ], {
  //     icon: myLocationIcon 
  //   })
  //     .addTo(map)
  //     .bindPopup(`Tu ubicación`)
  //     .openPopup();
   }


}
