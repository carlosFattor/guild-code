import { Injectable } from '@angular/core';
import { TagsApi } from './tags.api';
import { take, switchMap, catchError } from 'rxjs/operators';
import { StorageService } from '@shared/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AuthService } from '@shared/security/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  userEmail = '';
  userTags = [];

  constructor(
    private tagsApi: TagsApi,
    private storage: StorageService
  ) { }

  addTags(tag: string): void {
    this.addOrRemoveTag(tag);
    this.updateTag();
  }

  removeTag(tag: string): void {
    this.addOrRemoveTag(tag, true);
    this.updateTag();
  }

  private updateTag(): void {
    this.tagsApi.updateTags(this.userTags, this.userEmail)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.updateUserTags(this.userTags);
      });
  }

  private addOrRemoveTag(tag: string, remove: boolean = false): void {
    if (!remove) {
      this.userTags.push(tag);
    } else {
      this.userTags = this.userTags.filter(tempTag => tempTag !== tag);
    }
  }

  private updateUserTags(tags: string[]): void {
    this.storage.localStorage(null, (data: any) => {
      data.userData.tags = tags;
      return data;
    });

    this.userTags = tags;
  }

}
