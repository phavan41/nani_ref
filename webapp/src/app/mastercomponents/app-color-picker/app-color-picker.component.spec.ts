import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppColorPickerComponent } from './app-color-picker.component';

describe('AppColorPickerComponent', () => {
  let component: AppColorPickerComponent;
  let fixture: ComponentFixture<AppColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
