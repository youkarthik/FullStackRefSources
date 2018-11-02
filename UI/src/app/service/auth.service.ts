
import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';
import { Movie } from '../model/movie';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
export const TokenName = 'jwt_Token';
export const UserId = 'userId';


@Injectable()
export class AuthService {
    baseUrl = environment.authUrl;
    helper = new JwtHelperService();
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.loggedIn.next(this.getToken() != null);
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    getToken(): string {
        return localStorage.getItem(TokenName);
    }

    setToken(token: string): void {
        localStorage.setItem(TokenName, token);
    }

    setUserId(userId: string) {
        localStorage.setItem(UserId, userId);
    }

    getUserId() {
        return localStorage.getItem(UserId);
    }

    isTokenExpired() {
        return this.helper.isTokenExpired(this.getToken());
    }

    getTokenExpirationDate() {
        return this.helper.getTokenExpirationDate(this.getToken());
    }

    deleteToken(): void {
        localStorage.removeItem(TokenName);
        localStorage.removeItem(UserId);
        this.loggedIn.next(false);
    }
    
    public login(userId: string, password: string): Observable<any> { 
     
       const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
             
        })

    };
   
        const body = JSON.stringify({ userId: userId, password: password });
        return this.http.post(this.baseUrl + 'login', body).pipe(
            map((response: any): any => {
                this.loggedIn.next(true);                         
                return response;
            }),
            catchError((error: any): any => {
                if (error.status === 500) {
                    return of(error.status);
                }
            })
        );
    }

    public Register(user: User): Observable<any> {
        const body = JSON.stringify(user);
          
        return this.http.post(this.baseUrl + 'register', body).pipe(
            map((response: any): any => {
                return 'Registered sucessfully.';
            }),
            catchError((error: any): any => {
                if (error.status === 409) {
                    return of('Already Registered.');
                }
                if (error.status === 201) {
                    return of('Registered sucessfully.');
                }
            })
        );
    }

    private errorHandler(error: Response): Observable<any> {
        return throwError(error['error']);
    }
}
