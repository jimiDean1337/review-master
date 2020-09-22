import { DataService } from './services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logCache = [];
  log$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
  }

  init() {
    this.log$ = this.getLog();
  }
  log() {
    return  {
      info: (entry: any) => {
        this.logCache.push({ info: entry });
        // console.log('%c info', "color: blue; font-size: 36px", entry);
      },
      error: (entry: any) => {
        this.logCache.push({ error: entry });
        // console.log('%c error', 'color: red; font-size: 36px', entry);
      },
      warning: (entry: any) => {
        this.logCache.push({ warning: entry });
        // console.log('%c warning', 'color: yellow; font-size: 36px', entry);
      },
    }
  }

  getLog() {
    return Observable.create((obs: any) => {
      obs.next(this.logCache);
    })
  }
}
