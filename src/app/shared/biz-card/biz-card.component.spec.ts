import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizCardComponent } from './biz-card.component';

describe('BizCardComponent', () => {
  let component: BizCardComponent;
  let fixture: ComponentFixture<BizCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
