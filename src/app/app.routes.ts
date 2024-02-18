
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginUserPageComponent } from './pages/login-user-page/login-user-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { DetailPagesComponent } from './pages/detail-pages/detail-pages.component';
import { LocationPagesComponent } from './pages/location-pages/location-pages.component';
import {LocalizacionComponent} from './pages/localizacion/localizacion.component';
import { AdsDetailComponent } from './pages/ads/ads-detail/ads-detail.component';
import { AdsFormComponent } from './pages/ads/ads-form/ads-form.component';
import { AdsListComponent } from './pages/ads/ads-list/ads-list.component';
import { ReservaDetalleComponent } from './pages/reserva-detalle/reserva-detalle.component';
import { ReservaConfirmadaComponent } from './pages/reserva-confirmada/reserva-confirmada.component';
import { Chat2Component } from './chat2/chat2.component';
import { ChatlistComponent } from './chatlist/chatlist.component';

export const routes: Routes = [{path:'', component: LandingPageComponent},
{path:'home', component: HomePageComponent},
{path:'registro', component:LoginUserPageComponent},
{path:'usuarios', component: UsersPageComponent},
{path:'usuarios/:id', component: DetailPagesComponent}, 
{path: 'ubicacion', component: LocationPagesComponent},
{path: 'anuncio/registro', component: AdsFormComponent},
{path: 'anuncios', component: AdsListComponent},
{path: 'anuncios/:id', component: AdsDetailComponent},
{path: 'localizacion', component: LocalizacionComponent},
{path: 'reserva', component: ReservaDetalleComponent},
{path: 'confirmada/reserva', component: ReservaConfirmadaComponent},
{path: 'chat', component:Chat2Component},
{path: 'chatlist', component:ChatlistComponent}



    
];
