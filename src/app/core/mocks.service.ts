import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';
import { LoggerService } from './logger.service';
import * as firebase from 'firebase';
export declare type MockDataTypes = 'places' | 'categories';
@Injectable({
  providedIn: 'root'
})
export class MocksService {
  places: Observable<any>;
  categories: Observable<any>;

  constructor(private data: DataService, private logger: LoggerService) { }

  getMockData(type: string) {
    return Observable.create((obs: any) => {
      obs.next(this[type]);
    })
  }

  addMockPlace(type: string, id: string, data: any) {
    this.data.addToFirestoreDoc(type, id, {...data})
      .then(success => {
        this.logger.log().info(success)
      })
  }
}
