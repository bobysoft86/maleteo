import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../../services/services.service';
import swal from 'sweetalert';
import { HttpClient } from "@angular/common/http";
import { AuthenticateService } from '../../../services/authenticate.service';
import { Map, marker, tileLayer, icon, LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-ads-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ads-form.component.html',
  styleUrls: ['./ads-form.component.css'],
})
export class AdsFormComponent implements OnInit {
  propertyType = ['Casa', 'Hotel', 'Establecimiento'];
  propertySpace = ['Habitación', 'Hall', 'Trastero', 'Buhardilla', 'Garaje'];
  selectedFile: File | null = null;
  longitude: any;
  latitude: any;
  isLoading = true;
  marker: any;

  anuncioForm: FormGroup = this.formbuilder.group({
    name: new FormControl(''),
    propertyType: new FormControl(''),
    propertySpace: new FormControl(''),
    capacity: new FormControl(''),
    img: new FormControl(''),
    aviable: new FormControl(true),
    latitude: new FormControl(''),
    longitude: new FormControl('')
  });

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private servicesService: ServicesService,
    private http: HttpClient,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    // Verificar token al cargar la página
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
      this.createMap();
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

    map.on('click', (e: LeafletMouseEvent) => {
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;

      if (this.marker) {
        map.removeLayer(this.marker);
      }
      this.marker = marker([this.latitude, this.longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      }).addTo(map);
      const latitudeControl = this.anuncioForm.get('latitude');
const longitudeControl = this.anuncioForm.get('longitude');

if (latitudeControl && longitudeControl) {
  latitudeControl.setValue(this.latitude);
  longitudeControl.setValue(this.longitude);
}

    });
  }
  async onSubmit() {
    if (this.anuncioForm.valid) {
      const formValue = this.anuncioForm.value;

      this.isLoading = true; // Iniciar la carga

      this.servicesService.registerLocker(formValue).subscribe(
        (response) => {
          console.log('Registro exitoso', response.estacion);

          const userId = localStorage.getItem('id_user');
          const locker = response.estacion._id;
          const lockerUpdate = { estaciones: locker};

          this.servicesService.updateUser(userId, lockerUpdate).subscribe(
            (response) => {
              console.log(locker);
              console.log('Usuario actualizado con la estacion');
              this.router.navigate(['/ubicacion']);
            },
            (error) => {
              console.error('Error al actualizar el usuario', error);
            }
          );
        },
        (error) => {
          console.error('Error en el registro:', error);
          console.error('Detalles del error:', error.error);
          this.anuncioForm.enable();
        }
      ).add(() => {
        this.isLoading = false; // Finalizar la carga
      });
    }
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // uploadFile() {
  //   if (!this.selectedFile) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   this.http.post<any>('http://api-plum-six.vercel.app/api/upload', formData).subscribe(
  //     (response: any) => {
  //       console.log('Imagen subida con éxito:', response.imageUrl);
  //       this.anuncioForm.patchValue({
  //         img: response.imageUrl
  //       });
  //     },
  //     (error: any) => {
  //       console.error('Error al subir la imagen:', error);
  //     }
  //   );
  // }
}


//   const direccion = this.anuncioForm.get('location')?.value;
//   const direccionCodificada = encodeURIComponent(direccion);
//   const nominatimAPI = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=";

//   try {
//     const response = await fetch(nominatimAPI + direccionCodificada);
//     const data = await response.json();
//     console.log(data);

//     if (data.length > 0) {
//       const latitude2 = data[0].lat;
//       const longitude2 = data[0].lon;

//       this.anuncioForm.patchValue({
//         latitude: latitude2,
//         longitude: longitude2
//       });

//       const formValue = this.anuncioForm.value;

//       this.servicesService.registerLocker({
//         name: formValue.name,
//         latitude: formValue.latitude,
//         longitude: formValue.longitude,
//         propertyType: formValue.propertyType,
//         propertySpace: formValue.propertySpace,
//         capacity: formValue.capacity,
//         img: formValue.img,
//         available: formValue.available,
//       }).subscribe(
//         response => {
//           console.log('Datos enviados con exito a la API', response);
//           console.log(response);

//           this.router.navigate(['/anuncios']);
//         },
//         error => {
//           console.error('Error al enviar datos a la API:', error);
//         }
//       );
//     } else {
//       console.log('Sin resultados para la dirección proporcionada');
//     }
//   } catch (error) {
//     console.error('Error al obtener datos de Nominatim', error);


  //   this.http.post<any>('http://api-plum-six.vercel.app/api/upload', formData).subscribe(
  //     (response: any) => {
  //       console.log('Imagen subida con éxito:', response.imageUrl);
  //       this.anuncioForm.patchValue({
  //         img: response.imageUrl
  //       });
  //     },
  //     (error: any) => {
  //       console.error('Error al subir la imagen:', error);
  //     }
  //   );
  // }
// }
