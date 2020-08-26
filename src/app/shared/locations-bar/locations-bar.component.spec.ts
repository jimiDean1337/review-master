import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsBarComponent } from './locations-bar.component';

describe('LocationsBarComponent', () => {
  let component: LocationsBarComponent;
  let fixture: ComponentFixture<LocationsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
