import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getFieldsFromObject(value: any): any {
    const key = Object.keys(value)[0];
    return value[key];
  }
}
