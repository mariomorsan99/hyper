import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingViewComponent } from './programmingview.component';

describe('ProgrammingViewComponent', () => {
  let component: ProgrammingViewComponent;
  let fixture: ComponentFixture<ProgrammingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
