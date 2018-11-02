import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMovie } from '../model/movie.interface';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './movie-search.component.html'
})

export class MovieSearchComponent implements OnInit {
    movies: IMovie[];
    searchText: string;
    constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.searchText = params['searchText'];
                this.movieService.search(this.searchText).subscribe(response => {
                    this.movies = response;
                });
            });
    }

    NavigateToMovieDetails(movieId: number) {
        this.router.navigate(['movie', movieId]);
    }
}
