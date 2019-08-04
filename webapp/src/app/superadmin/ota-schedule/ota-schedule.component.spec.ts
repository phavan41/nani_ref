import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaScheduleComponent } from './ota-schedule.component';

describe('OtaScheduleComponent', () => {
  let component: OtaScheduleComponent;
  let fixture: ComponentFixture<OtaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtaScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
