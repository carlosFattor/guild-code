import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '@environment';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${ENV.server}${req.url}` });
    return next.handle(apiReq);
  }
}
