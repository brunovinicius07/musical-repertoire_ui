import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private api = 'http://localhost:8080/v1/music/user';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserById(idUser: string): Observable<any> {
    return this.http.get<any>(`${this.api}/get/${idUser}`, {
      headers: this.getHeaders()
    });
  }

  updateUser(idUser: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/put/${idUser}`, body, {
      headers: this.getHeaders()
    });
  }

  deleteUser(idUser: string): Observable<any> {
    return this.http.delete(`${this.api}/delete/${idUser}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
