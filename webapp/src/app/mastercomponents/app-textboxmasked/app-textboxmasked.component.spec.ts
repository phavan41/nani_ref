import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextboxmaskedComponent } from './app-textboxmasked.component';

describe('AppTextboxmaskedComponent', () => {
  let component: AppTextboxmaskedComponent;
  let fixture: ComponentFixture<AppTextboxmaskedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTextboxmaskedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTextboxmaskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
