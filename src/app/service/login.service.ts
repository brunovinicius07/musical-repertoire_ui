import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  apiUrl: string = "http://localhost/v1/music/auth";

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
}
