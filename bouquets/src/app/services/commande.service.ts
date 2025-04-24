import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CommandeRequestDTO {
  acheteurId: number;
  dateCommande: string;
  bouquetIds: number[];
  quantites: number[];
}

export interface CommandeResponseDTO {
  id: number;
  dateCommande: string;
  acheteurId: number;
  bouquets: {
    id: number;
    nom: string;
    description: string;
    prix: number;
    imageUrl: string;
    quantite: number;
  }[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8080/commandes'; // adapte le port si besoin

  constructor(private http: HttpClient) {}

  createCommande(dto: CommandeRequestDTO): Observable<CommandeResponseDTO> {
    return this.http.post<CommandeResponseDTO>(`${this.baseUrl}`, dto);
  }

  getAllCommandes(): Observable<CommandeResponseDTO[]> {
    return this.http.get<CommandeResponseDTO[]>(`${this.baseUrl}`);
  }
}
