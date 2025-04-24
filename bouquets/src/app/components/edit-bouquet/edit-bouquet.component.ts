import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {BouquetService} from '../../services/bouquet.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-bouquet',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './edit-bouquet.component.html'
})
export class EditBouquetComponent implements OnInit {
  bouquet: any = {};
  selectedFile!: File;
  previewUrl: string | null = null;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private bouquetService: BouquetService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bouquetService.getBouquetById(this.id).subscribe(data => {
      this.bouquet = data;
      this.previewUrl = 'http://localhost:8080' + data.imageUrl;
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

  onUpdate() {
    const formData = new FormData();
    formData.append('nom', this.bouquet.nom);
    formData.append('description', this.bouquet.description);
    formData.append('prix', this.bouquet.prix);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.bouquetService.updateBouquet(this.id, formData).subscribe({
      next: () => {
        alert('🎉✨Bouquet modifié avec succès ! 🎉');
        this.router.navigate(['/']);
      },
      error: () => alert("Erreur lors de la modification")
    });
  }
}
