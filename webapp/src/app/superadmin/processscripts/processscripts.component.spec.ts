import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessscriptsComponent } from './processscripts.component';

describe('ProcessscriptsComponent', () => {
  let component: ProcessscriptsComponent;
  let fixture: ComponentFixture<ProcessscriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessscriptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
