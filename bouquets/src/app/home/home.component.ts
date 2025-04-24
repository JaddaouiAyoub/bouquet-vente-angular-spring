import { Component, OnInit } from '@angular/core';
import { BouquetService, BouquetResponseDTO } from '../services/bouquet.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import {PanierService} from '../services/panier.service'; // si tu veux un toast stylé (optionnel)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  bouquets: BouquetResponseDTO[] = [];
  showMenu: boolean = false;

  constructor(private bouquetService: BouquetService, private router:Router, protected authService:AuthService,  private toastr: ToastrService , private panierService:PanierService
  ) {}

  ngOnInit(): void {
    this.bouquetService.getAll().subscribe(data => {
      this.bouquets = data;
    });
  }


  addToCart(bouquet: BouquetResponseDTO) {
    this.panierService.addToPanier(bouquet);
    alert("🛒 Bouquet ajouté au panier !");
  }

  // Fonction de redirection vers la page d'ajout du bouquet
  redirectToAddBouquet() {
    this.router.navigate(['/add']);
  }

  selectedMenuId: number | null = null;

  toggleMenu(bouquetId: number) {
    this.selectedMenuId = this.selectedMenuId === bouquetId ? null : bouquetId;
  }
  onEdit(bouquet: any) {
    this.router.navigate(['/bouquets/edit', bouquet.id]);
  }

  onDelete(bouquet: any) {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer "${bouquet.nom}" ?`);
    if (confirmDelete) {
      this.bouquetService.delete(bouquet.id).subscribe({
        next: () => {
          this.bouquets = this.bouquets.filter(b => b.id !== bouquet.id); // Met à jour l'affichage
          this.selectedMenuId = null;
          this.toastr.success('Bouquet supprimé avec succès'); // si tu as ngx-toastr
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Erreur lors de la suppression'); // (optionnel)
        }
      });
    }
  }
}
