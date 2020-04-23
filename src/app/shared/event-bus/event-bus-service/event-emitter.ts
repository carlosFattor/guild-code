export abstract class EventEmitter<T> {
  constructor(public channel: string, public value?: T) { }
}
