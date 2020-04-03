import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigationLayoutComponent } from './top-navigation-layout.component';

describe('TopNavigationLayoutComponent', () => {
  let component: TopNavigationLayoutComponent;
  let fixture: ComponentFixture<TopNavigationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
