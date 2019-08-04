import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDaterangepickerComponent } from './app-daterangepicker.component';

describe('AppDaterangepickerComponent', () => {
  let component: AppDaterangepickerComponent;
  let fixture: ComponentFixture<AppDaterangepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDaterangepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDaterangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
