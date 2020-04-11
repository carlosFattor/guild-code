import { Injectable } from '@angular/core';
import { LocalStoragedData } from './local-storaged-data.interface';
import { SessionStoragedData } from './session-storaged-data.interface';
import { StorageArgumentFunction } from './storage-argument-function.type';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly SYSTEM_STORAGE_KEY = 'guild-code';

  localStorage(calle: StorageArgumentFunction<LocalStoragedData | null> = data => data): LocalStoragedData | null {
    return this.treatStorage<LocalStoragedData>(localStorage, calle);
  }

  sessionStorage(calle: StorageArgumentFunction<SessionStoragedData | null> = data => data): SessionStoragedData | null {
    return this.treatStorage<SessionStoragedData>(sessionStorage, calle);
  }

  private treatStorage<StorageType>(
    storage: Storage, calle: StorageArgumentFunction<StorageType | null>
  ): StorageType | null {
    const serialized = storage.getItem(this.SYSTEM_STORAGE_KEY);
    let parsed = null;
    if (serialized) {
      parsed = JSON.parse(serialized);
    }

    const edited = calle(parsed);
    storage.setItem(this.SYSTEM_STORAGE_KEY, JSON.stringify(edited));

    return edited;
  }
}
