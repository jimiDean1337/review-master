import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  addToDatabase(list: string, data: any) {
    return this.db.list(list).push(data);
  }

  getDatabase(list: string) {
    return this.db.list(list).valueChanges();
  }

  addToFirestoreCollection(path: string, data: any) {
    const collection = this.afs.collection(path);
    return collection.add(data);
  }

  addToFirestoreDoc(path: string, id: string, data: any) {
    return this.afs.doc(`${path}/${id}`).set(data);
  }

  addPlace(path: string, id: string, data: any) {
    this.afs.doc(`places/${id}`).set(data)
  }
}
