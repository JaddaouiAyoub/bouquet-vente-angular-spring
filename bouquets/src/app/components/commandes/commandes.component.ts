import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../services/commande.service';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})
export class CommandesComponent implements OnInit {

  commandes: any[] = [];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getAllCommandes().subscribe({
      next: (data) => this.commandes = data,
      error: (err) => alert('Erreur lors de la récupération des commandes')
    });
  }
}
