import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'rm-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  suggestions: any;
  currentCity$: Subject<string>;
  constructor(private logger: LoggerService) {
    this.currentCity$ = new Subject();
  }

  setCategory(e: any) {
    console.log('category set emitted', e)
  }

  setLocation(e: any) {
    this.currentCity$.next(e);
    console.log('location set', e)
  }
  ngOnInit(): void {
    this.logger.init();
    this.suggestions = [
      {
        message: 'Last review 1 month ago. Share yours?',
      },
      {
        message: 'Last review 1 month ago. Share yours?',
      },
      {
        message: 'Last review 1 month ago. Share yours?',
      }
    ];
  }

}
