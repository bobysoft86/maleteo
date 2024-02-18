import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceEstaciones } from '../interfaces/interface-estaciones';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {
  constructor(private http: HttpClient) {}


  getAllEstaciones(): Observable<InterfaceEstaciones[]> {
    return this.http.get<InterfaceEstaciones[]>('https://api-plum-six.vercel.app/api/estaciones'); 
  }


  getFilteredEstaciones(filters: any): Observable<InterfaceEstaciones[]> {
  
    const filteredEstaciones: InterfaceEstaciones[] = []; 
    

    // PONER FILTRO 

    return new Observable(observer => {
      observer.next(filteredEstaciones);
      observer.complete();
    });
  }
}
