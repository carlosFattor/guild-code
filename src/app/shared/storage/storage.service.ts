import { Injectable } from '@angular/core';
import { StorageArgumentFunction } from './storage-argument-function.type';
import { Params } from '../types/params';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly STORAGE_KEY = 'guild-code';

  formatData<T>(data: T): Params {
    const result = {};
    Object.keys(data).forEach(key => {
      result[key] = data[key];
    });
    return result;
  }

  localStorage<T>(identifier: string | null = null, callback: StorageArgumentFunction<T | null> = data => data): T | null {
    return this.treatStorage<T>(identifier, localStorage, callback);
  }

  private treatStorage<StorageType>(
    identifier: string,
    storage: Storage,
    callback: StorageArgumentFunction<StorageType | null>
  ): StorageType | null {

    const serialized = storage.getItem(this.STORAGE_KEY);
    let parsed = null;
    if (serialized) {
      parsed = JSON.parse(serialized);
    }
    const edited = callback(parsed);
    storage.setItem(this.STORAGE_KEY, JSON.stringify(edited));
    if (!identifier) {
      return edited;
    }
    if (edited) {
      return edited[identifier];
    }
    return null;
  }
}
