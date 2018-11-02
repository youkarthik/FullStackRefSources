import { Component, OnInit } from '@angular/core';
import { IMovie } from '../model/movie.interface';
import { WishlistService } from '../service/wishlist.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './whish-list.component.html',
})
export class WishlistComponent implements OnInit {
    movies: IMovie[];
    constructor(private wishlistService: WishlistService, private router: Router) { }

    ngOnInit() {
        this.movieSubscribe();
    }
    update(movie: IMovie) {
        this.wishlistService.put(movie).subscribe(
            response => {
                window.alert('Updated Succesfully');
            });
    }

    delete(id: number) {
        this.wishlistService.Delete(id).subscribe(
            response => {
                window.alert('Deleted Succesfully');
                this.movieSubscribe();
            });
    }

    private movieSubscribe() {
        this.wishlistService.GetWatchList().subscribe(
            result => {
                this.movies = result;
            });
    }
}
