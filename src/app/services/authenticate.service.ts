import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthenticateService {
private apiUrl = 'https://api-plum-six.vercel.app'; // Reemplaza con la URL de tu servidor

  constructor(private http: HttpClient) {}

  // Método para enviar el token al servidor y verificar la autenticación
  authenticate(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/auth`, {}, { headers });
  }
}