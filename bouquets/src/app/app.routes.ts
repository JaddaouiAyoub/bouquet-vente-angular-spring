import { Routes } from '@angular/router';
import {CreateBouquetComponent} from './components/create-bouquet/create-bouquet.component';
import {HomeComponent} from './home/home.component';
import {EditBouquetComponent} from './components/edit-bouquet/edit-bouquet.component';
import {CartComponent} from './components/cart/cart.component';
import {CommandesComponent} from './components/commandes/commandes.component';
import {RegisterComponent} from './pages/register/register.component';

export const routes: Routes = [
  {path: 'add',component:CreateBouquetComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {
    path: 'bouquets/edit/:id',
    component: EditBouquetComponent
  },
  {
    path: 'panier',
    component: CartComponent
  },
  { path: 'commandes', component: CommandesComponent },
  { path: 'register', component: RegisterComponent },
];
