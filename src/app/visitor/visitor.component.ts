import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rm-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  suggestions: any;
  constructor() { }

  ngOnInit(): void {
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
