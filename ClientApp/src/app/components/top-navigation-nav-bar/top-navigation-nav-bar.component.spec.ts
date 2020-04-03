import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigationNavBarComponent } from './top-navigation-nav-bar.component';

describe('TopNavigationNavBarComponent', () => {
  let component: TopNavigationNavBarComponent;
  let fixture: ComponentFixture<TopNavigationNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigationNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
