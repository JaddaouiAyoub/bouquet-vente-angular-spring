import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {BouquetResponseDTO} from './bouquet.service';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private panierSubject = new BehaviorSubject<BouquetResponseDTO[]>(this.getPanierFromStorage());
  panier$ = this.panierSubject.asObservable();

  private getPanierFromStorage(): BouquetResponseDTO[] {
    return JSON.parse(localStorage.getItem('panier') || '[]');
  }

  addToPanier(bouquet: BouquetResponseDTO) {
    const panier = this.getPanierFromStorage();
    panier.push(bouquet);
    localStorage.setItem('panier', JSON.stringify(panier));
    this.panierSubject.next(panier); // ➕ Mise à jour des observateurs
  }

  getPanierCount(): number {
    return this.getPanierFromStorage().length;
  }

  setPanier(panier: any[]) {
    localStorage.removeItem('panier');
    this.panierSubject.next(panier);
  }
}
