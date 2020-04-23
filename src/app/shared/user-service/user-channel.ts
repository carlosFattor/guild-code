import CustomEvent from '@shared/event-bus/event-bus-service/custom-event.interface';

export class UserChannel implements CustomEvent {
  constructor(public channel: string) { }
}
