import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../model/movie';
import { MovieSearchComponent } from './movie-search.component';


describe('MovieSearchComponent', () => {
    let component: MovieSearchComponent;
    let fixture: ComponentFixture<MovieSearchComponent>;
    let movieService: MovieService;
    let router: Router;
    // tslint:disable-next-line:prefer-const
    let route: ActivatedRoute;

    beforeEach(async(() => {
        movieService = jasmine.createSpyObj('movieService', ['search']);
        ((movieService.search) as jasmine.Spy).and.returnValue(of(null));
        router = jasmine.createSpyObj('router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [MovieSearchComponent],
            providers: [
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: route },
                { provide: MovieService, useValue: movieService },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieSearchComponent);
        component = fixture.componentInstance;
    });

    it('should Create', () => {
        expect(component).toBeTruthy();
    });

    it('should Navigate to movies', () => {
        // Act
        component.NavigateToMovieDetails(1);

        // Assert
        expect(router.navigate).toHaveBeenCalled();
    });
});
