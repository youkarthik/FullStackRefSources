import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { WishlistService } from '../service/wishlist.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../model/movie';
import { WishlistComponent } from './whish-list.component';


describe('WishlistComponent', () => {
    let component: WishlistComponent;
    let fixture: ComponentFixture<WishlistComponent>;
    let wishlistService: WishlistService;
    let router: Router;

    beforeEach(async(() => {
        wishlistService = jasmine.createSpyObj('wishlistService', ['post', 'put', 'Delete']);
        ((wishlistService.put) as jasmine.Spy).and.returnValue(of(null));
        ((wishlistService.Delete) as jasmine.Spy).and.returnValue(of(true));
        router = jasmine.createSpyObj('router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [WishlistComponent],
            providers: [
                { provide: Router, useValue: router },
                { provide: WishlistService, useValue: wishlistService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WishlistComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Updae- should call http put method', () => {

        // Arrange
        const movie = new Movie();

        // Act
        component.update(movie);

        // Assert
        expect(wishlistService.put).toHaveBeenCalled();
    });

    it('Delete -shoul call http delete method', () => {
        // Arrange
        const id = 1;

        // Act
        component.delete(id);

        // Assert
        expect(wishlistService.Delete).toHaveBeenCalled();
    });
});
