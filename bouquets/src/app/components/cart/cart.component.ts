import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {CommandeRequestDTO, CommandeService} from '../../services/commande.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {PanierService} from '../../services/panier.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  panier: any[] = [];
  private isAuthenticated: boolean = false ;

  ngOnInit(): void {
    const storedPanier = localStorage.getItem('panier');
    this.panier = storedPanier ? JSON.parse(storedPanier) : [];
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  constructor(private commandeService:CommandeService ,private panierService:PanierService,private router:Router, private authService:AuthService) {
  }

  removeItem(index: number): void {
    this.panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(this.panier));
  }

  getTotal(): number {
    return this.panier.reduce((total, item) => total + item.prix, 0);
  }

  commander(): void {
    const acheteurId = this.authService.getUserId();
    if (!acheteurId) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    const bouquetIds = this.panier.map(item => item.id);
    const quantites = this.panier.map(() => 1); // ou item.quantite si tu gères les quantités
    const dateCommande = new Date().toISOString(); // même format que dans Postman

    const dto : CommandeRequestDTO = {
      acheteurId: acheteurId,
      dateCommande: dateCommande,
      bouquetIds: bouquetIds,
      quantites: quantites
    };

    this.commandeService.createCommande(dto).subscribe({
      next: () => {
        this.panier = [];
        this.panierService.setPanier(this.panier); // Met à jour le service panier
        alert('Commande passée avec succès ! 🎉');
        this.router.navigate(['/']); // Redirige vers la page d'accueil ou une autre page
      },
      error: (err) => {alert('Erreur lors de la commande 😓') ; console.log(err)}
    });
  }
}
