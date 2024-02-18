import { Component } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
import { user } from '../../../interfaces/user_interface';

@Component({
  selector: 'app-ads-list',
  styleUrls: ['./ads-list.component.css'],
  templateUrl: './ads-list.component.html',
})
export class AdsListComponent {
  establecimientos: any[] = [];

  constructor(private servicesService: ServicesService, private authService: AuthenticateService, private router: Router) {}
  user!:user;
  id!:string | null;

  ngOnInit(): void {
  this.id = localStorage.getItem('id_user');
   
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
           this.getData();



  }
  getData(){
    this.servicesService.getUserId(this.id).subscribe((data:any) => {
      this.user= data.data;
      this.establecimientos = this.user.estaciones;
       }   )
  }
  
  navigateToDetail(id: string): void {
    this.router.navigate(['anuncios', id]);
  }
}
