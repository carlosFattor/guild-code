import { Injectable } from '@angular/core';
import { StorageService } from '@shared/storage/storage.service';
import Tokens from '@domain/tokens.model';
import { LoginData } from '@domain/login-data.model';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokens: Tokens | null = null;
  private TOKEN_IDENTIFIER = 'tokenData';
  isAuthenticated = false;

  constructor(
    private userState: UserStateService,
    private storage: StorageService,
    private http: HttpClient,
    private router: Router
  ) { }

  loadTokens(): void {
    this.tokens = this.storage.localStorage(this.TOKEN_IDENTIFIER, (data) => {
      return data;
    });
  }

  setTokens(tokens: Tokens): void {
    this.storage.localStorage(this.TOKEN_IDENTIFIER, (data: Tokens) => {
      data = { ...tokens };
      return data;
    });
    this.tokens = tokens;
    this.isAuthenticated = true;
  }

  getJwtToken(): string | null {
    if (this.tokens) {
      return this.tokens.token;
    }
    return null;
  }

  getRefreshToken(): string {
    return this.tokens.refreshToken;
  }

  refreshToken(): Observable<Tokens> {
    const token = this.getRefreshToken();
    return this.http.post<{ tokens: Tokens }>('/api/v1/users/refresh', {
      refreshToken: token
    }).pipe(
      switchMap((objectTokens: { tokens: Tokens }) => {
        return of(objectTokens.tokens);
      }),
      catchError((error: HttpErrorResponse) => {
        this.loggedOut();
        return throwError(error);
      })
    );
  }

  loggedOut(): void {
    this.storage.localStorage(null, data => {
      data = null;
      return data;
    });
    this.userState.user = null;
    this.isAuthenticated = false;
    this.router.navigateByUrl('/');
  }
}
