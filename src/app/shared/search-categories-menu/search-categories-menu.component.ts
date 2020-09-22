import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rm-search-categories-menu',
  templateUrl: './search-categories-menu.component.html',
  styleUrls: ['./search-categories-menu.component.scss']
})
export class SearchCategoriesMenuComponent implements OnInit {
  categories = [
    {
      name: 'Restaurants',
      category: 'restaurants'
    },
    {
      name: 'Delivery',
      category: 'delivery'
    },
    {
      name: 'Takeout',
      category: 'takeout'
    },
    {
      name: 'Accountants',
      category: 'accountants'
    },
    {
      name: 'Plumbers',
      category: 'plumbers'
    },
    {
      name: 'Auto Repair',
      category: 'auto_repair'
    },
    {
      name: 'Movers',
      category: 'mover'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
