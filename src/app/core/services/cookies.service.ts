import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  cookieCache: any[] = [];

  constructor(private cookie: CookieService) { }

  add(name: string, value: any) {
    if (this.cookie.check(name)) {
      this.cookie.delete(name);
    }
    if (typeof value === 'object') {
      this.cookie.set(name, JSON.stringify(value));
      this.addToCache(name, value);
    } else {
      this.cookie.set(name, value);
      this.addToCache(name, value);
    }
  }

  addToCache(name: string, value: any) {
    this.cookieCache.push({ name, value });
  }

  check(name: string) {
    return this.cookie.check(name);
  }

  delete(name: string) {
    this.cookie.delete(name);
  }
  deleteCache() {
    this.cookieCache = [];
  }

  deleteAll() {
    this.cookie.deleteAll();
    this.deleteCache();
  }

  get(name: string) {
    if (!this.check(name)) {
      return false;
    }
    const cookieVal = this.cookie.get(name);
    if (typeof JSON.parse(cookieVal) === 'object') {
      return JSON.parse(cookieVal);
    }
    return cookieVal;
  }

  getAll() {
    return this.cookie.getAll();
  }
}
