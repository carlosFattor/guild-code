import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import Tokens from '@domain/tokens.model';
import { Injectable } from '@angular/core';
import { HttpInterceptionErrorResponse } from '@shared/exception/exceptions/impl/http-interception-error.response';

@Injectable({
  providedIn: 'root'
})
export class HttpJwtInterceptor implements HttpInterceptor {

  private HTTP_ERROR_CODE = 401;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<null>(null);

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.loadTokens();
    const token = this.authService.getJwtToken();
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status === this.HTTP_ERROR_CODE) {
            return this.handleRefreshToken(req, next);
          } else {
            return throwError(new HttpInterceptionErrorResponse(error.error));
          }
        })
      );
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((objectToken: Tokens) => {
          this.authService.setTokens(objectToken);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(objectToken.token);
          return next.handle(this.addToken(request, objectToken.token));
        }),
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
