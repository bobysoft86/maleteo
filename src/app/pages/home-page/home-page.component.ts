import { CommonModule } from '@angular/common';
import { Continent } from '../../interfaces/inferfaces_home';
import { Location } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  continents: Continent[] = [
    { name: 'África', price: '3000 CFA', price2:'2000 CFA' },
    { name: 'América', price: '11 USD', price2:'7 USD' },
    { name: 'Asia', price: '900 JPY', price2:'700 JPY' },
    { name: 'Europa', price: '6€', price2:'4€' },
    { name: 'Oceanía', price: '10 AUD', price2:'8 AUD' },
    { name: 'Antártida', price: 'Gratis', price2:'Gratis' }
  ];
  selectedContinent: string = '';

  constructor(private location: Location) {}

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }

  getContinentPrice(continentName: string): string {
    const continent = this.continents.find(continent => continent.name === continentName);
    return continent ? continent.price : '';
  }

  getContinentPrice2(continentName: string): string {
    const continent = this.continents.find(continent => continent.name === continentName);
    return continent ? continent.price2 : '';
  }
 
}