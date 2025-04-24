// create-bouquet.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BouquetRequestDTO, BouquetService} from '../../services/bouquet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-bouquet',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-bouquet.component.html',
  styleUrls: ['./create-bouquet.component.css']
})
export class CreateBouquetComponent {
  bouquet: BouquetRequestDTO = {
    nom: '',
    description: '',
    prix: 0,
    imageUrl: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private bouquetService: BouquetService,private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file); // Ici, file est garanti non null
    }
  }


  onSubmit() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('nom', this.bouquet.nom);
    formData.append('description', this.bouquet.description);
    formData.append('prix', this.bouquet.prix.toString());

    this.bouquetService.uploadBouquet(formData).subscribe({
      next: response => {
        alert('🎉 Bouquet créé avec succès !');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        alert('❌ Une erreur est survenue lors de la création du bouquet.');
      }
    });
  }
}
