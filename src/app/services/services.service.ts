import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { user } from '../interfaces/user_interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'https://api-plum-six.vercel.app/api/estaciones';
  private apiUrl2 = `https://api-plum-six.vercel.app/api/user`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error en la petición getAllUsers:', error);
          return throwError(error);
        })
      );
  }

  getUserId(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error en la petición getUserId:', error);
          return throwError(error);
        })
      );
  }

  getEstablecimientoById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(error => {
          console.error('Error en la petición getEstablecimientoById:', error);
          return throwError(error);
        })
      );
  }

  registerLocker(locker: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, locker)
      .pipe(
        catchError(error => {
          console.error('Error en la petición registerLocker:', error);
          return throwError(error);
        })
      );
  }

  loginUser(user: user): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/authenticate`, user)
      .pipe(
        catchError(error => {
          console.error('Error en la petición loginUser:', error);
          return throwError(error);
        })
      );
  }

  registerUser(user: user): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/register`, user)
      .pipe(
        catchError(error => {
          console.error('Error en la petición registerUser:', error);
          return throwError(error);
        })
      );
  }

  updateUser(userId: any, locker: any): Observable<any> {
    const updateUrl = `${this.apiUrl2}/register/${userId}`;
    const body = locker;
    return this.http.patch(updateUrl, body)
      .pipe(
        catchError(error => {
          console.error('Error en la petición updateUser:', error);
          return throwError(error);
        })
      );
  }

  updateLocker(userId: any, locker: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/${userId}`;
    const body = locker;
    return this.http.patch(updateUrl, body)
      .pipe(
        catchError(error => {
          console.error('Error en la petición updateLocker:', error);
          return throwError(error);
        })
      );
  }
}
