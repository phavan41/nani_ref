import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTreedropdownComponent } from './app-treedropdown.component';

describe('AppTreedropdownComponent', () => {
  let component: AppTreedropdownComponent;
  let fixture: ComponentFixture<AppTreedropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTreedropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTreedropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
