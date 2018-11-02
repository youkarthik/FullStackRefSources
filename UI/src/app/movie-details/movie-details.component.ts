import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../model/movie';
import { IMovie } from '../model/movie.interface';
import { MovieService } from '../service/movie.service';
import { Router } from '@angular/router';
import { WishlistService } from '../service/wishlist.service';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {
  movie: IMovie;
  movies: IMovie[];
  movieId: number;
  constructor(private route: ActivatedRoute, private movieService: MovieService,
    private wishlistService: WishlistService,
    private router: Router) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.movieService.getById(this.movieId).subscribe(
      response => {
        this.movie = response;
      });

    this.movieService.getRecomentedMovies(this.movieId).subscribe(
      response => {
        this.movies = response;
      });
  }

  NavigateToMovieDetails(movieId: number) {
    this.router.navigate(['movie', movieId]);
  }

  Save(movie: IMovie) {
    this.wishlistService.post(movie).subscribe(
      message => {
        window.alert(message);
        this.router.navigate(['/wish-list']);
      });
  }
}
