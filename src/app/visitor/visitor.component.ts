import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'rm-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  suggestions: any;
  constructor(private logger: LoggerService) { }

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
    ]
  }

}
