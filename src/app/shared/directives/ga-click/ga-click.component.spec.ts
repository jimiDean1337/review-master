import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaClickComponent } from './ga-click.component';

describe('GaClickComponent', () => {
  let component: GaClickComponent;
  let fixture: ComponentFixture<GaClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
