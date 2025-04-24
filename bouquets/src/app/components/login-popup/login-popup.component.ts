import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LoginRequestDTO, UserResponseDTO, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {
  isModalOpen: boolean = false; // Contrôle de l'ouverture/fermeture du modal
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Message d'erreur en cas de login échoué

  constructor(private userService:UserService,private router:Router,private authService:AuthService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Fonction appelée lors de la soumission du formulaire de login
  onLogin() {
    // Vérification si l'email et le mot de passe sont ceux de l'admin
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      // Connexion réussie en tant qu'admin
      console.log('Connexion réussie en tant qu\'admin');
      // Gérer l'état d'authentification (par exemple, enregistrer l'admin dans le localStorage)
      localStorage.setItem('user', JSON.stringify({ email: this.email, role: 'admin' }));
      // Mettre à jour l'état d'authentification dans le service
      this.authService.setAuthenticated(true);
      // Fermer la popup
      this.closeModal();
      // Rediriger l'admin vers la page d'administration ou une autre page
      this.router.navigate(['/admin']);
    } else {
      // Utilisateur non admin, appel à la méthode de login du service pour vérifier dans la base de données
      const credentials: LoginRequestDTO = {
        email: this.email,
        password: this.password
      };

      this.userService.login(credentials).subscribe(
        (response: UserResponseDTO | string) => {
          if (typeof response === 'string') {
            // Si la réponse est un message d'erreur (par exemple, erreur de connexion)
            this.errorMessage = response;
          } else {
            // Connexion réussie pour un utilisateur classique
            console.log('Utilisateur connecté:', response);
            // Enregistrer l'utilisateur dans le localStorage
            localStorage.setItem('user', JSON.stringify(response));
            // Mettre à jour l'état d'authentification dans le service
            this.authService.setAuthenticated(true);
            // Fermer la popup
            this.closeModal();
            // Rediriger l'utilisateur vers la page d'accueil ou une autre page
            this.router.navigate(['/']);
          }
        },
        (error) => {
          // Gestion d'erreur si l'API renvoie une erreur
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Erreur de connexion, veuillez vérifier vos identifiants.';
        }
      );
    }
  }
}
