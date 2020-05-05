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

  getDevice(): string {
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      return 'mobile';
    }
    if (/Chrome/i.test(ua)) {
      return 'Chrome';
    }

    if (/Mozilla/i.test(ua)) {
      return 'Mozilla';
    }

    return 'desktop-other';
  }
}
