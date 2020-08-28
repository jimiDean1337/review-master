import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HovercardComponent } from './hovercard.component';

describe('HovercardComponent', () => {
  let component: HovercardComponent;
  let fixture: ComponentFixture<HovercardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HovercardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HovercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
