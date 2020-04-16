import { Injectable } from '@angular/core';
import { StorageService } from '@shared/storage/storage.service';
import Tokens from '@domain/tokens.model';
import { LoginData } from '@domain/login-data.model';
import { tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokens: Tokens | null = null;
  private TOKEN_IDENTIFIER = 'tokenData';

  constructor(
    private storage: StorageService,
    private http: HttpClient
  ) { }

  loadTokens(): void {
    this.tokens = this.storage.localStorage(this.TOKEN_IDENTIFIER, (data) => {
      return data;
    });
  }

  setTokens(tokens: Tokens): void {
    this.storage.localStorage(null, (data: LoginData) => {
      data.tokenData = { ...tokens };
      return data;
    });
    this.tokens = tokens;
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
      })
    );
  }
}
