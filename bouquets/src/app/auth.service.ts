import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    // Vérifie l'authentification au chargement de l'application (par exemple, via localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Getter pour l'état de l'authentification
  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Fonction pour mettre à jour l'état d'authentification
  setAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Déconnexion (par exemple, suppression de user dans localStorage)
  logout() {
    localStorage.removeItem('user');
    this.setAuthenticated(false);
  }
  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.email === 'admin@gmail.com';
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    return user?.id;
  }
}
