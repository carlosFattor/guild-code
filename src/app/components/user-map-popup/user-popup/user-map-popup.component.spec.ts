import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMapPopupComponent } from './user-map-popup.component';

describe('UserMapPopupComponent', () => {
  let component: UserMapPopupComponent;
  let fixture: ComponentFixture<UserMapPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMapPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
