import { EventEmitter } from '@shared/event-bus/event-bus-service/event-emitter';

export class UserEventEmitter<T> extends EventEmitter<T> { }
