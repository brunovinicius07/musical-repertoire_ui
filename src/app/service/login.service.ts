import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  apiUrl: string = "http://localhost:8080/v1/music/auth";

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.nameUser)
      })
    )
  }

  signup(nameUser: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", {nameUser, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.nameUser)
      })
    )
  }

  forgotPassword(email: string): Observable<string> {
    return this.httpClient.put(
      this.apiUrl + "/forgotPassword",
      { email },
      { responseType: 'text' as const }
    );
  }
}
