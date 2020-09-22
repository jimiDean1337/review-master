import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCategoriesMenuComponent } from './search-categories-menu.component';

describe('SearchCategoriesMenuComponent', () => {
  let component: SearchCategoriesMenuComponent;
  let fixture: ComponentFixture<SearchCategoriesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCategoriesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCategoriesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
