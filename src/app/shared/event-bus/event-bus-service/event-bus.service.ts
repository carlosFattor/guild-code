import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, map, catchError } from 'rxjs/operators';
import { EventEmitter } from './event-emitter';
import CustomEvent from './custom-event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject = new Subject<any>();

  on<T>(event: CustomEvent, action: (value: T) => void): Subscription {
    return this.subject
      .pipe(
        filter((e: EventEmitter<T>) => e.channel === event.channel),
        map((e: EventEmitter<T>) => e),
        catchError(error => { throw new Error(`There are something wrong with event-bus = ${error.message}`) })
      )
      .subscribe((e: EventEmitter<T>) => action(e.value));
  }

  emit<T>(event: EventEmitter<T>): void {
    this.subject.next(event);
  }
}
