import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMovie } from '../model/movie.interface';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: IMovie[];

  constructor(private movieService: MovieService, private router: Router) {

  }

  ngOnInit() {
    this.movieService.get().subscribe(result => {
      this.movies = result;
    });
  }

  NavigateToMovieDetails(movieId: number) {
    this.router.navigate(['movie', movieId]);
  }
}
