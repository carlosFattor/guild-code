import { KeysSubscription } from './keys-subscription';

export interface SubscriptionType {
  device: string;
  endpoint: string;
  expirationTime: string;
  keys: KeysSubscription;
  status: boolean;
}
