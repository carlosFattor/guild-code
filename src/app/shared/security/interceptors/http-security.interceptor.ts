import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '@shared/storage/storage.service';
import { UaaResultSet } from '../uaa-result-set.interface';
import { SessionStoragedData } from '@shared/storage/session-storaged-data.interface';
import { UaaApi } from '../uaa.api';

@Injectable({
  providedIn: 'root'
})
export class HttpSecurityInterceptor implements HttpInterceptor {

  private readonly HTTP_UNAUTHORIZED = 401;
  private readonly HEADER_DEFAULT_DATA_TYPE = 'application/json';

  constructor(
    private uaaApi: UaaApi,
    private router: Router,
    private storageService: StorageService,
  ) { }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const headers = this.generateHeaders<T>(request);
    const clonedRequest = request.clone({
      setHeaders: headers
    });

    return next.handle(clonedRequest)
      .pipe(catchError(error => this.unsuccessFlow<T>(error, clonedRequest, next)));
  }

  private unsuccessFlow<T>(
    error: any, request: HttpRequest<T>, next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const storaged = this.storageService.sessionStorage();
    const uaaStoragedData = storaged?.auth;
    const authorizationHeader = request.headers.get('Authorization');
    const isAuthorizationTokenIsBearer = /^bearer/.test(authorizationHeader || '');

    if (
      error instanceof HttpErrorResponse &&
      error.status === this.HTTP_UNAUTHORIZED &&
      uaaStoragedData &&
      isAuthorizationTokenIsBearer
    ) {
      return from(this.refreshTokenFlow<T>(
        uaaStoragedData, request, next
      ));
    }
  }

  private async refreshTokenFlow<T>(
    uaaStoragedData: UaaResultSet,
    request: HttpRequest<T>,
    next: HttpHandler
  ): Promise<HttpEvent<T>> {
    let newUaaData: UaaResultSet;
    try {
      newUaaData = await this.uaaApi.refreshToken(uaaStoragedData).toPromise();
    } catch (e) {
      this.expulsarSistema();
      return Promise.reject(e);
    }
    this.storageService.sessionStorage(storaged => this.persistUaaData(storaged, newUaaData));
    const headers = this.generateHeaders<T>(request, true);
    const clonedRequest = request.clone({
      setHeaders: headers
    });

    return next.handle(clonedRequest).toPromise();
  }

  private expulsarSistema(): void {
    this.storageService.sessionStorage(data => {
      delete data?.auth;
      return data;
    });

    this.router.navigate(['login']);
  }

  private persistUaaData(
    storaged: SessionStoragedData | null,
    newUaaData: UaaResultSet
  ): SessionStoragedData {
    storaged = storaged || {};
    storaged.auth = newUaaData;
    return storaged;
  }

  private generateHeaders<T>(request: HttpRequest<T>, overrideAuthorizationHeader = false): { [header: string]: string } {
    const contentType = this.getContentType(request);
    const authorization = this.getAuthorization(request, overrideAuthorizationHeader);

    const headers: { [header: string]: string } = {
      'Content-Type': contentType
    };

    if (authorization) {
      headers.Authorization = authorization;
    }

    return headers;
  }

  private getContentType<T>(request: HttpRequest<T>): string {
    let contentType = request.headers.get('Content-Type');
    contentType = contentType || this.HEADER_DEFAULT_DATA_TYPE;

    return contentType;
  }

  private getAuthorization<T>(request: HttpRequest<T>, overrideAuthorizationHeader: boolean): string | null {
    let authorization = request.headers.get('Authorization');
    const storagedData = this.storageService.sessionStorage();
    const accessToken = storagedData?.auth?.access_token;
    const tokenType = storagedData?.auth?.token_type;
    const sessionHasTokens = tokenType && accessToken;
    const shouldSetSessionToken = (overrideAuthorizationHeader && authorization || !authorization);

    if (shouldSetSessionToken && sessionHasTokens) {
      authorization = `${tokenType} ${accessToken}`;
    }

    return authorization;
  }
}
