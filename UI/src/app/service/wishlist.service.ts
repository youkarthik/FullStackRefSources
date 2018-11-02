import { Injectable } from '@angular/core';

import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../model/movie.interface';
import { map, catchError } from 'rxjs/operators';
import { Observable, observable, of } from 'rxjs';
import { Movie } from '../model/movie';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class WishlistService {
    url = environment.wishlistUrl;
    constructor(private http: HttpClient) { }

    public post(movie: IMovie): Observable<any> {

        const movieObj = {
            id: movie.id,
            title: movie.title,            
            vote_average: movie.vote_average,           
            popularity: movie.popularity,           
            poster_path: movie.poster_path,            
            original_title: movie.original_title,                    
            overview: movie.overview,
            release_date: movie.release_date,
            vote_count: movie.vote_count, 
            comments:movie.comments        
            
        };
        const bodyData = JSON.stringify(movieObj);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.post(this.url, bodyData, httpOptions).pipe(
            map((response: any): any => {
                return 'Added sucessfully.';
            }),
            catchError((error: any): any => {
                if (error.status === 409) {
                   return of('Already Added.');
                }
            })
        );
    }

    public put(movie: IMovie): Observable<boolean> {
        const updatedObject = {           
            id: movie.id,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            comments: movie.comments
        };

        const bodyData = JSON.stringify(updatedObject);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.put(this.url + '/' + movie.id, bodyData, httpOptions).pipe(
            map((response: Response): any => {
                const status = response.status;
                if (status === 200) {
                    return true;
                } else if (status === 404) {
                    return 'A server error occurred.';
                } else if (status !== 200 && status !== 204) {
                    return 'An unexpected server error occurred.';
                }

                return false;
            }));
    }

    public GetWatchList(): Observable<Array<IMovie>> {
        return this.http.get(this.url).pipe(
            map((response: any) => {
                return this.mapWatchlists(response);
            }));
    }

    mapWatchlists(response: any): any {
        const movies = [];
        response.forEach(item => {
            movies.push(this.mapWatchlist(item));
        });

        return movies;
    }

    mapWatchlist(data: any): IMovie {
        const response = new Movie();
        response.id = data.id;      
        response.comments = data.comments;
        response.overview = data.overview;
        response.popularity = data.popularity;
        response.poster_path = data.poster_path;
        response.release_date = data.release_date;
        response.title = data.movieName;
        response.vote_average = data.vote_average;
        response.vote_count = data.vote_count;
        return response;
    }

    public Delete(id: number): Observable<boolean> {
        return this.http.delete(this.url + '/' + id).pipe(
            map((response: Response): any => {
                const status = response.status;
                if (status === 200) {
                    return true;
                }

                return false;
            }));
    }
}
