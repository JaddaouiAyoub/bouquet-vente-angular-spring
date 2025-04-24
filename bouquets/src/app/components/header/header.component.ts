import { Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import {NgIf} from '@angular/common';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {PanierService} from '../../services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [LoginPopupComponent, NgIf]
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  panierCount: number = 0;

  constructor(private authService: AuthService,private router:Router,private panierService:PanierService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.panierService.panier$.subscribe(panier => {
      this.panierCount = panier.length;
    });
  }

  checkPanierCount() {
    const panier = localStorage.getItem('panier');
    if (panier) {
      this.panierCount = JSON.parse(panier).length;
    }
  }

  logout() {
    this.authService.logout();
    // Rediriger vers la page d'accueil après déconnexion
    this.router.navigate(['/']);
  }

  // Mettre à jour le nombre d'articles dans le panier
  updatePanierCount() {
    const panier = localStorage.getItem('panier');
    this.panierCount = panier ? JSON.parse(panier).length : 0;
  }

  // Visualiser le panier
  viewCart() {
    this.router.navigate(['/panier']);
  }
}
