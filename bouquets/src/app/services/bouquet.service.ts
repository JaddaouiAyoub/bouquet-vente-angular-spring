import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Ajoutez HttpClientModule ici
import { Observable } from 'rxjs';

export interface BouquetRequestDTO {
  nom: string;
  description: string;
  prix: number;
  imageUrl: string;
}

export interface BouquetResponseDTO {
  id: number;
  nom: string;
  description: string;
  prix: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BouquetService {
  private baseUrl = 'http://localhost:8080/api/bouquets'; // adapte l'URL si nécessaire

  constructor(private http: HttpClient) {}

  getAll(): Observable<BouquetResponseDTO[]> {
    return this.http.get<BouquetResponseDTO[]>(this.baseUrl);
  }

  create(dto: BouquetRequestDTO): Observable<BouquetResponseDTO> {
    return this.http.post<BouquetResponseDTO>(this.baseUrl, dto);
  }

  update(id: number, dto: BouquetRequestDTO): Observable<BouquetResponseDTO> {
    return this.http.put<BouquetResponseDTO>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  uploadBouquet(formData: FormData): Observable<BouquetResponseDTO> {
    return this.http.post<BouquetResponseDTO>(`${this.baseUrl}/bouquets`, formData);
  }
  getBouquetById(id: number): Observable<BouquetResponseDTO> {
    return this.http.get<BouquetResponseDTO>(`${this.baseUrl}/${id}`);
  }
  updateBouquet(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/bouquets/${id}`, data);
  }
}
