import { EstacionesService } from './../../services/estaciones-service.service';
import { InterfaceEstaciones } from './../../interfaces/interface-estaciones';
import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule ,FormControl, FormGroup} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { Validators } from '@angular/forms';



import swal from 'sweetalert';






@Component({
  selector: 'app-location-pages',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './location-pages.component.html',
  styleUrl: './location-pages.component.css'
})
export class LocationPagesComponent implements OnInit {
  constructor(private router:Router, private authService: AuthenticateService ){}

  ngOnInit(): void {
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
  
  profileForm = new FormGroup({
    addressForm: new FormControl('', [Validators.required]),
    dayPutForm: new FormControl('', [Validators.required]),
    dayOutForm: new FormControl('', [Validators.required]),
    numObjectsForm: new FormControl('', [Validators.required])
    
  });

 
estaciones: InterfaceEstaciones[] = [];
filteredEstaciones: InterfaceEstaciones[] = [];

OnSearch(){
  localStorage.setItem("addressForm", this.profileForm.value.addressForm! )
  localStorage.setItem("dayPutForm", this.profileForm.value.dayPutForm! )
  localStorage.setItem("dayOutForm", this.profileForm.value.dayOutForm! )
  localStorage.setItem("numObjectsForm", this.profileForm.value.numObjectsForm! )
  console.log (this.profileForm.value);
  this.router.navigate(["/localizacion"])
}
  }



