import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieListComponent } from './movie-list/movie-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { WishlistComponent } from './wishlist/whish-list.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth-guard.service';


const routes: Routes = [
  { path: ' ', redirectTo: '/login', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
  { path: 'wish-list', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'search-result', component: MovieSearchComponent, canActivate: [AuthGuard] },//, canActivate: [AuthGuard]
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieSearchComponent,
    WishlistComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
