import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlookViewComponent } from './outlookview.component';

describe('OutlookViewComponent', () => {
  let component: OutlookViewComponent;
  let fixture: ComponentFixture<OutlookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
