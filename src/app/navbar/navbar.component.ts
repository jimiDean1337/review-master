import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'rm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() displayType: 'search' | 'home' | 'visitor';
  @Input() searchBarHidden = true;
  @Input() loggedIn = false;
  public screenWidth: any;
  public screenHeight: any;
  menuIsOpen = false;
  searchIsOpen = false;
  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log("NavbarComponent -> onResize -> event", event)
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }


  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  toggleSearch() {
    this.searchIsOpen = !this.searchIsOpen;
  }

}
