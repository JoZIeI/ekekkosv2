import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMenuRegisterComponent } from './man-menu-register.component';

describe('ManMenuRegisterComponent', () => {
  let component: ManMenuRegisterComponent;
  let fixture: ComponentFixture<ManMenuRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMenuRegisterComponent]
    });
    fixture = TestBed.createComponent(ManMenuRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
