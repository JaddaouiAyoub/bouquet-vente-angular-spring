import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserRequestDTO, UserService} from '../../services/user.service';
import {HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ ReactiveFormsModule, HttpClientModule], // ✅ Ajoute ReactiveFormsModule ici

  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: UserRequestDTO = this.registerForm.value;

      this.userService.register(newUser).subscribe({
        next: () => {
          alert('Inscription réussie ! ✨🎉');

          const loginPayload = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
          };

          this.userService.login(loginPayload).subscribe({
            next: (user) => {
              console.log(user);
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/home']);
            },
            error: (loginErr) => {
              console.log(loginErr);
              alert("Inscription OK mais erreur lors de la connexion automatique 😅");
              this.router.navigate(['/login']);
            }
          });
        },
        error: (err) => {
          console.log(err);
          alert("Erreur lors de l'inscription. 🤦‍♂️");
        }
      });
    }
  }

}
