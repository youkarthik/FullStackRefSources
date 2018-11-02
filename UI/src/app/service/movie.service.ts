import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../model/movie';
import { IMovie } from '../model/movie.interface';
import { environment } from '../../environments/environment.prod';


@Injectable()
export class MovieService {
    tmdbEndpoint: string;

    constructor(private http: HttpClient) {
        // tslint:disable-next-line:max-line-length
        this.tmdbEndpoint = environment.tmdbUrl + 'movie/popular?page=1&language=en-US&api_key=84e747d123fcfd4d8bbd2792dc5bd306';
    }

    get(): Observable<Array<IMovie>> {
        return this.http.get(this.tmdbEndpoint).pipe(
            map((response: any) => {
                return this.mapMovies(response.results);
            }));
    }

    getById(movieId: number): Observable<IMovie> {
        const url = environment.tmdbUrl + 'movie/' + movieId + '?api_key=84e747d123fcfd4d8bbd2792dc5bd306&language=en-US';
        return this.http.get(url).pipe(
            map((response: any) => {
                return this.mapMovie(response);
            }));
    }

    getRecomentedMovies(movieId: number): Observable<Array<IMovie>> {
        const url = environment.tmdbUrl + '/movie/' + movieId +
            '/recommendations?api_key=84e747d123fcfd4d8bbd2792dc5bd306&language=en-US&page=1';
        return this.http.get(url).pipe(
            map((response: any) => {
                return this.mapMovies(response.results);
            }));
    }

    search(term: string): Observable<Array<IMovie>> {
        // tslint:disable-next-line:max-line-length
        const url = environment.tmdbUrl + 'search/movie?api_key=84e747d123fcfd4d8bbd2792dc5bd306&language=en-US&page=1&include_adult=false&sort_by=popularity.desc&query=' + term;

        if (term === '' || term == null || term === undefined) {
            return null;
        }

        return this.http.get(url).pipe(
            map((response: any) => {
                return this.mapMovies(response.results);
            }));
    }

    mapMovies(response: any): any {
        const movies = [];
        response.forEach(item => {
            movies.push(this.mapMovie(item));
        });

        return movies;
    }

    mapMovie(data: any): IMovie {
        const response = new Movie();
        response.id = data.id;       
        response.comments = data.comments;
        response.original_title = data.original_title;
        response.overview = data.overview;
        response.popularity = data.popularity;
        response.poster_path = data.poster_path;
        response.release_date = data.release_date;
        response.title = data.title;       
        response.vote_average = data.vote_average;
        response.vote_count = data.vote_count;
        return response;
    }
}
