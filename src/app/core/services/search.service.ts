import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(queryString, ...locationArgs) {
  console.log("SearchService -> search -> queryString, ...args", queryString, ...locationArgs)
  }
}
