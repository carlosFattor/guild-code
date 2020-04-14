import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsApi {

  constructor(
    private http: HttpClient
  ) { }

  updateTags(tags: string[], email: string): Observable<void> {
    return this.http.put<void>('/api/v1/users/tags', { tags, email })
      .pipe(
        catchError(error => {
          throw new Error(error.message);
        })
      );
  }
}
