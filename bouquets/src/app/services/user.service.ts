import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRequestDTO {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  adresse: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  adresse: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users'; // adapte le port si nécessaire

  constructor(private http: HttpClient) { }

  register(user: UserRequestDTO): Observable<UserResponseDTO | string> {
    return this.http.post<UserResponseDTO | string>(`${this.baseUrl}/register`, user);
  }

  login(credentials: LoginRequestDTO): Observable<UserResponseDTO | string> {
    return this.http.post<UserResponseDTO | string>(`${this.baseUrl}/login`, credentials);
  }
}
