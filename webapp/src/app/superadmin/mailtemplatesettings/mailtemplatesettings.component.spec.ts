import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailtemplatesettingsComponent } from './mailtemplatesettings.component';
describe('MailtemplatesettingsComponent', () => {
  let component: MailtemplatesettingsComponent;
  let fixture: ComponentFixture<MailtemplatesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailtemplatesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailtemplatesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
