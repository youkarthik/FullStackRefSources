import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { WishlistService } from '../service/wishlist.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../model/movie';


describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieService: MovieService;
  let wishlistService: WishlistService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    movieService = jasmine.createSpyObj('movieService', ['getById']);
    wishlistService = jasmine.createSpyObj('wishlistService', ['post']);
    ((movieService.getById) as jasmine.Spy).and.returnValue(of(null));
    ((wishlistService.post) as jasmine.Spy).and.returnValue(of(null));
    router = jasmine.createSpyObj('router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: MovieService, useValue: movieService },
        { provide: WishlistService, useValue: wishlistService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
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

  it('should Call to Post method', () => {
    // Arrange
    const movie = new Movie();

    // Act
    component.Save(movie);

    // Assert
    expect(wishlistService.post).toHaveBeenCalled();
  });
});
