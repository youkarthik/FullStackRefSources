import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../model/movie';
import { MovieListComponent } from './movie-list.component';


describe('MovieListComponent', () => {
    let component: MovieListComponent;
    let fixture: ComponentFixture<MovieListComponent>;
    let movieService: MovieService;
    let router: Router;

    beforeEach(async(() => {
        movieService = jasmine.createSpyObj('movieService', ['getById']);
        ((movieService.getById) as jasmine.Spy).and.returnValue(of(null));
        router = jasmine.createSpyObj('router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [MovieListComponent],
            providers: [
                { provide: Router, useValue: router },
                { provide: MovieService, useValue: movieService },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieListComponent);
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
