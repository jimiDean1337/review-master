import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Review Master';
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  }
}

// TODO: Get user auth status
//  TODO: if loggedIn get user data
// TODO: redirect to appropriate route: Visitor, User orAdmmin
