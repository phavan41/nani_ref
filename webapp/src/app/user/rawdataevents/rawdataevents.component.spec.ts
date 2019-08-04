import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawdataeventsComponent } from './rawdataevents.component';

describe('RawdataeventsComponent', () => {
  let component: RawdataeventsComponent;
  let fixture: ComponentFixture<RawdataeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawdataeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawdataeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
