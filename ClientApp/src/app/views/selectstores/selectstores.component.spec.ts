import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStoresComponent } from './selectstores.component';

describe('SelectstoresComponent', () => {
  let component: SelectStoresComponent;
  let fixture: ComponentFixture<SelectStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
