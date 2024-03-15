import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMetodopagoRegisterComponent } from './man-metodopago-register.component';

describe('ManMetodopagoRegisterComponent', () => {
  let component: ManMetodopagoRegisterComponent;
  let fixture: ComponentFixture<ManMetodopagoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMetodopagoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManMetodopagoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
