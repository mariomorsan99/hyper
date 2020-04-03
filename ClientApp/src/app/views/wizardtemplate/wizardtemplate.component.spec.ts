import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardTemplateComponent } from './wizardtemplate.component';

describe('WizardTemplateComponent', () => {
  let component: WizardTemplateComponent;
  let fixture: ComponentFixture<WizardTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
